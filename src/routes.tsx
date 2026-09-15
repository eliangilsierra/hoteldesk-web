import type { ReactElement } from 'react';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';
import Habitaciones from './pages/Habitaciones';
import Huespedes from './pages/Huespedes';
import Placeholder from './pages/Placeholder';

interface AppRoute {
  path: string;
  element: ReactElement;
}

const placeholderPages = [
  { path: '/calendario', title: 'Calendario', description: 'Vista de calendario de reservas' },
  { path: '/checkin', title: 'Check-in', description: 'Proceso de check-in' },
  { path: '/checkout', title: 'Check-out', description: 'Proceso de check-out' },
  { path: '/facturacion', title: 'Facturación', description: 'Gestión de facturas y pagos' },
  { path: '/reportes', title: 'Reportes', description: 'Reportes y estadísticas' },
  { path: '/ajustes', title: 'Ajustes', description: 'Configuración del sistema' },
];

const placeholderRoutes: AppRoute[] = placeholderPages.map(({ path, title, description }) => ({
  path,
  element: <Placeholder title={title} description={description} />,
}));

export const appRoutes: AppRoute[] = [
  { path: '/', element: <Dashboard /> },
  { path: '/reservas', element: <Reservas /> },
  { path: '/habitaciones', element: <Habitaciones /> },
  { path: '/huespedes', element: <Huespedes /> },
  ...placeholderRoutes,
];
