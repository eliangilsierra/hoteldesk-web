import { 
  LayoutDashboard, 
  Calendar, 
  BedDouble, 
  Users, 
  LogIn, 
  LogOut, 
  FileText,
  Settings,
  BarChart3
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { title: 'Dashboard', url: '/', icon: LayoutDashboard },
  { title: 'Reservas', url: '/reservas', icon: Calendar },
  { title: 'Calendario', url: '/calendario', icon: Calendar },
  { title: 'Habitaciones', url: '/habitaciones', icon: BedDouble },
  { title: 'Huéspedes', url: '/huespedes', icon: Users },
  { title: 'Check-in', url: '/checkin', icon: LogIn },
  { title: 'Check-out', url: '/checkout', icon: LogOut },
  { title: 'Facturación', url: '/facturacion', icon: FileText },
  { title: 'Reportes', url: '/reportes', icon: BarChart3 },
  { title: 'Ajustes', url: '/ajustes', icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  const getNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return isActive 
      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
      : 'hover:bg-sidebar-accent/50';
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-3 py-4">
          <h2 className={`font-bold transition-all ${open ? 'text-lg' : 'text-xs text-center'}`}>
            {open ? 'Hotel Admin' : 'HA'}
          </h2>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item.url)}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
