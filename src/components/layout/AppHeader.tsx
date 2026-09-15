import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/auth-store';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function AppHeader() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border bg-background px-4">
      <SidebarTrigger />
      
      <div className="flex-1" />
      
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="h-9 w-9"
      >
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {user && (
        <>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">{user.name}</span>
            <span className="ml-2 text-xs">({user.role})</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Salir
          </Button>
        </>
      )}
    </header>
  );
}
