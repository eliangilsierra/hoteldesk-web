import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { useAuthStore } from "@/lib/stores/auth-store";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reservas from "./pages/Reservas";
import Habitaciones from "./pages/Habitaciones";
import Huespedes from "./pages/Huespedes";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex flex-1 flex-col">
                      <AppHeader />
                      <main className="flex-1 p-6">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/reservas" element={<Reservas />} />
                          <Route path="/calendario" element={<Placeholder title="Calendario" description="Vista de calendario de reservas" />} />
                          <Route path="/habitaciones" element={<Habitaciones />} />
                          <Route path="/huespedes" element={<Huespedes />} />
                          <Route path="/checkin" element={<Placeholder title="Check-in" description="Proceso de check-in" />} />
                          <Route path="/checkout" element={<Placeholder title="Check-out" description="Proceso de check-out" />} />
                          <Route path="/facturacion" element={<Placeholder title="Facturación" description="Gestión de facturas y pagos" />} />
                          <Route path="/reportes" element={<Placeholder title="Reportes" description="Reportes y estadísticas" />} />
                          <Route path="/ajustes" element={<Placeholder title="Ajustes" description="Configuración del sistema" />} />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                </SidebarProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
