import { create } from 'zustand';
import type { Room, Guest, Reservation } from '../types';
import { generateRooms, generateGuests, generateReservations } from '../mock/faker-data';

interface DataState {
  rooms: Room[];
  guests: Guest[];
  reservations: Reservation[];
  initialized: boolean;
  initialize: () => void;
  
  // Room operations
  addRoom: (room: Room) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  
  // Guest operations
  addGuest: (guest: Guest) => void;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  
  // Reservation operations
  addReservation: (reservation: Reservation) => void;
  updateReservation: (id: string, updates: Partial<Reservation>) => void;
  deleteReservation: (id: string) => void;
}

export const useDataStore = create<DataState>((set) => ({
  rooms: [],
  guests: [],
  reservations: [],
  initialized: false,
  
  initialize: () => {
    const rooms = generateRooms(50);
    const guests = generateGuests(200);
    const reservations = generateReservations(rooms, guests, 250);
    
    set({ rooms, guests, reservations, initialized: true });
  },
  
  // Room operations
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  updateRoom: (id, updates) => set((state) => ({
    rooms: state.rooms.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  deleteRoom: (id) => set((state) => ({
    rooms: state.rooms.filter(r => r.id !== id)
  })),
  
  // Guest operations
  addGuest: (guest) => set((state) => ({ guests: [...state.guests, guest] })),
  updateGuest: (id, updates) => set((state) => ({
    guests: state.guests.map(g => g.id === id ? { ...g, ...updates } : g)
  })),
  deleteGuest: (id) => set((state) => ({
    guests: state.guests.filter(g => g.id !== id)
  })),
  
  // Reservation operations
  addReservation: (reservation) => set((state) => ({
    reservations: [...state.reservations, reservation]
  })),
  updateReservation: (id, updates) => set((state) => ({
    reservations: state.reservations.map(r => r.id === id ? { ...r, ...updates } : r)
  })),
  deleteReservation: (id) => set((state) => ({
    reservations: state.reservations.filter(r => r.id !== id)
  })),
}));
