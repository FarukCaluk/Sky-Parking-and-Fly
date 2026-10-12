import { SITE } from '@/data/site';
import type { BookingConfirmation } from '@/types';
import { parseISODate, parseTime } from './date';

export interface IcsLabels {
  dropOff: string;
  pickUp: string;
  description: (reference: string, plate: string, phone: string) => string;
  calendarName: string;
}

const pad = (n: number): string => String(n).padStart(2, '0');

/** `20261020T100000` — floating local time, so the calendar app shows the airport time as entered. */
function stamp(isoDate: string, isoTime: string, offsetMinutes = 0): string {
  const parts = parseISODate(isoDate);
  const minutes = parseTime(isoTime);
  if (!parts || minutes === null) throw new Error('Invalid date for calendar export');
  const d = new Date(parts.year, parts.month, parts.day, 0, minutes + offsetMinutes);
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

const escapeText = (value: string): string =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/** RFC 5545 line folding (75 octets, continuation lines start with a space). */
function fold(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;
  const chunks: string[] = [];
  let current = '';
  for (const char of line) {
    const limit = chunks.length === 0 ? 75 : 74;
    if (encoder.encode(current + char).length > limit) {
      chunks.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  chunks.push(current);
  return chunks.join('\r\n ');
}

interface EventInput {
  uid: string;
  summary: string;
  date: string;
  time: string;
  description: string;
  location: string;
  dtstamp: string;
}

function buildEvent({ uid, summary, date, time, description, location, dtstamp }: EventInput): string[] {
  return [
    'BEGIN:VEVENT',
    `UID:${uid}@skyparkingfly`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${stamp(date, time)}`,
    // One-hour window around the planned arrival / return
    `DTEND:${stamp(date, time, 60)}`,
    `SUMMARY:${escapeText(summary)}`,
    `LOCATION:${escapeText(location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT3H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeText(summary)}`,
    'END:VALARM',
    'END:VEVENT',
  ];
}

export function buildIcs(confirmation: BookingConfirmation, labels: IcsLabels): string {
  const { reference, createdAt, request } = confirmation;
  const { stay, vehicle } = request;
  const dtstamp = createdAt.replace(/[-:]/g, '').replace(/\.\d+/, '');
  const location = `${SITE.name}, ${SITE.address.street}, ${SITE.address.city}`;
  const description = labels.description(reference, vehicle.plate.toUpperCase(), SITE.phone.display);

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${SITE.name}//${labels.calendarName}//${request.locale.slice(0, 2).toUpperCase()}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...buildEvent({
      uid: `${reference}-arrival`,
      summary: labels.dropOff,
      date: stay.dropOffDate,
      time: stay.dropOffTime,
      description,
      location,
      dtstamp,
    }),
    ...buildEvent({
      uid: `${reference}-return`,
      summary: labels.pickUp,
      date: stay.pickUpDate,
      time: stay.pickUpTime,
      description,
      location,
      dtstamp,
    }),
    'END:VCALENDAR',
  ];
  return `${lines.map(fold).join('\r\n')}\r\n`;
}
