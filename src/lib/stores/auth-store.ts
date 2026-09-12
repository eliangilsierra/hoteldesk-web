import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { generateUsers } from '../mock/faker-data';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const mockUsers = generateUsers();

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication - accept any password for demo users
        const user = mockUsers.find(u => u.email === email);
        
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'hotel-auth',
    }
  )
);
