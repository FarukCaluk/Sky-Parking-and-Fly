import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import { initNavigation } from '@/router/navigation';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

initNavigation();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
