import { useCallback, useMemo, useReducer } from 'react';
import { BookingError, bookingGateway } from '@/services/bookingGateway';
import type {
  BookingConfirmation,
  BookingRequest,
  DriverDetails,
  DriverField,
  VehicleDetails,
  VehicleField,
} from '@/types';
import { validateDriver, validateVehicle, type FieldErrors } from '@/utils/validation';

export type WizardStep = 1 | 2 | 3;
export type TouchableField = DriverField | VehicleField | 'consent';
export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface WizardState {
  step: WizardStep;
  /** 1 when moving forward, −1 when going back — drives the slide direction. */
  direction: 1 | -1;
  driver: DriverDetails;
  vehicle: VehicleDetails;
  consent: boolean;
  touched: Partial<Record<TouchableField, true>>;
  /** Steps where the visitor pressed "Continue" — all errors become visible there. */
  attempted: Partial<Record<WizardStep, true>>;
  status: SubmitStatus;
  error: string | null;
  confirmation: BookingConfirmation | null;
}

type Action =
  | { type: 'driver'; field: DriverField; value: string }
  | { type: 'vehicle'; field: VehicleField; value: string }
  | { type: 'touch'; field: TouchableField }
  | { type: 'consent'; value: boolean }
  | { type: 'attempt'; step: WizardStep }
  | { type: 'go'; step: WizardStep }
  | { type: 'submitting' }
  | { type: 'success'; confirmation: BookingConfirmation }
  | { type: 'failure'; message: string }
  | { type: 'reset' };

const initialState: WizardState = {
  step: 1,
  direction: 1,
  driver: { fullName: '', email: '', phone: '' },
  vehicle: { plate: '', make: '', color: '', passengers: '1', flightNumber: '' },
  consent: false,
  touched: {},
  attempted: {},
  status: 'idle',
  error: null,
  confirmation: null,
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'driver':
      return { ...state, driver: { ...state.driver, [action.field]: action.value } };
    case 'vehicle':
      return { ...state, vehicle: { ...state.vehicle, [action.field]: action.value } };
    case 'touch':
      return state.touched[action.field] ? state : { ...state, touched: { ...state.touched, [action.field]: true } };
    case 'consent':
      return { ...state, consent: action.value, touched: { ...state.touched, consent: true } };
    case 'attempt':
      return { ...state, attempted: { ...state.attempted, [action.step]: true } };
    case 'go':
      return { ...state, step: action.step, direction: action.step > state.step ? 1 : -1, error: null };
    case 'submitting':
      return { ...state, status: 'submitting', error: null };
    case 'success':
      return { ...state, status: 'success', confirmation: action.confirmation, error: null };
    case 'failure':
      return { ...state, status: 'error', error: action.message };
    case 'reset':
      return initialState;
  }
}

export interface BookingWizard {
  state: WizardState;
  driverErrors: FieldErrors<DriverField>;
  vehicleErrors: FieldErrors<VehicleField>;
  /** Error to display for a field — only once it was touched or the step was attempted. */
  errorFor: (field: DriverField | VehicleField) => string | undefined;
  isValid: (field: DriverField | VehicleField) => boolean;
  setDriver: (field: DriverField, value: string) => void;
  setVehicle: (field: VehicleField, value: string) => void;
  touch: (field: TouchableField) => void;
  setConsent: (value: boolean) => void;
  attempt: (step: WizardStep) => void;
  go: (step: WizardStep) => void;
  submit: (request: BookingRequest) => Promise<void>;
  reset: () => void;
}

export function useBookingWizard(): BookingWizard {
  const [state, dispatch] = useReducer(reducer, initialState);

  const driverErrors = useMemo(() => validateDriver(state.driver), [state.driver]);
  const vehicleErrors = useMemo(() => validateVehicle(state.vehicle), [state.vehicle]);

  const errorFor = useCallback(
    (field: DriverField | VehicleField): string | undefined => {
      const isDriverField = field === 'fullName' || field === 'email' || field === 'phone';
      if (!state.touched[field] && !state.attempted[2]) return undefined;
      return isDriverField ? driverErrors[field] : vehicleErrors[field as VehicleField];
    },
    [state.touched, state.attempted, driverErrors, vehicleErrors],
  );

  const isValid = useCallback(
    (field: DriverField | VehicleField): boolean => {
      const isDriverField = field === 'fullName' || field === 'email' || field === 'phone';
      const value = isDriverField ? state.driver[field] : state.vehicle[field as VehicleField];
      const error = isDriverField ? driverErrors[field] : vehicleErrors[field as VehicleField];
      return Boolean(state.touched[field]) && value.trim() !== '' && !error;
    },
    [state.touched, state.driver, state.vehicle, driverErrors, vehicleErrors],
  );

  const submit = useCallback(async (request: BookingRequest) => {
    dispatch({ type: 'submitting' });
    try {
      const confirmation = await bookingGateway.submit(request);
      dispatch({ type: 'success', confirmation });
    } catch (error) {
      dispatch({
        type: 'failure',
        message: error instanceof BookingError ? error.message : 'Došlo je do greške. Pokušajte ponovo.',
      });
    }
  }, []);

  return {
    state,
    driverErrors,
    vehicleErrors,
    errorFor,
    isValid,
    setDriver: useCallback((field, value) => dispatch({ type: 'driver', field, value }), []),
    setVehicle: useCallback((field, value) => dispatch({ type: 'vehicle', field, value }), []),
    touch: useCallback((field) => dispatch({ type: 'touch', field }), []),
    setConsent: useCallback((value) => dispatch({ type: 'consent', value }), []),
    attempt: useCallback((step) => dispatch({ type: 'attempt', step }), []),
    go: useCallback((step) => dispatch({ type: 'go', step }), []),
    submit,
    reset: useCallback(() => dispatch({ type: 'reset' }), []),
  };
}
