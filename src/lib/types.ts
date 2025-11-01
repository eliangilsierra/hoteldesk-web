// Core types for hotel management system

export type RoomType = 'Sencilla' | 'Doble' | 'Suite';
export type RoomStatus = 'Disponible' | 'Ocupada' | 'Mantenimiento';
export type ReservationStatus = 'pendiente' | 'confirmada' | 'check-in' | 'check-out' | 'cancelada' | 'no-show';
export type ReservationSource = 'directa' | 'booking' | 'expedia' | 'airbnb' | 'telefono' | 'correo';
export type PaymentMethod = 'efectivo' | 'tarjeta' | 'transferencia';
export type PaymentStatus = 'pendiente' | 'pagado' | 'parcial';
export type UserRole = 'ADMIN' | 'RECEPTION' | 'FINANCE';

export interface Room {
  id: string;
  number: string;
  floor: number;
  type: RoomType;
  baseRateCOP: number;
  status: RoomStatus;
  amenities: string[];
  capacity: number;
}

export interface Guest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  docType: 'CC' | 'CE' | 'Pasaporte';
  docNumber: string;
  preferences?: string;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  code: string;
  guestId: string;
  roomId?: string;
  roomType: RoomType;
  checkIn: Date;
  checkOut: Date;
  status: ReservationStatus;
  source: ReservationSource;
  occupants: number;
  notes?: string;
  createdAt: Date;
}

export interface Charge {
  id: string;
  reservationId: string;
  concept: string;
  qty: number;
  unitPriceCOP: number;
  totalCOP: number;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  reservationId: string;
  items: Charge[];
  subtotalCOP: number;
  taxCOP: number;
  totalCOP: number;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface DashboardStats {
  occupancyToday: number;
  occupancyWeek: number;
  revenueEstimated: number;
  checkInsToday: number;
  checkOutsToday: number;
  pendingReservations: number;
}

export interface OccupancyData {
  date: string;
  occupancy: number;
  revenue: number;
}
