import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import { preloadFooter } from '@/components/lazy';
import { loadPage } from '@/pages/loaders';
import { initNavigation } from '@/router/navigation';
import { matchPath } from '@/router/routes';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root not found');

initNavigation();

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The code of this page comes first: React then finds nothing to wait for, and the page never shows a loading state
const { route } = matchPath(window.location.pathname);
await Promise.all([loadPage(route ?? 'notFound'), preloadFooter()]).catch(() => undefined);

if (route && root.hasChildNodes()) {
  // The page arrived as finished HTML (the build prerenders every address): bring it to life instead of drawing it again
  hydrateRoot(root, app);
} else {
  // Development server, or an address the build knows nothing about (the 404 page is drawn in the visitor's language)
  createRoot(root).render(app);
}
