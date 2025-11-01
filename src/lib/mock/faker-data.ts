// Mock data generation using Faker
import { faker } from '@faker-js/faker';
import type { Room, Guest, Reservation, User, RoomType, ReservationStatus, ReservationSource } from '../types';

// Seed for consistency
faker.seed(123);

const roomTypes: RoomType[] = ['Sencilla', 'Doble', 'Suite'];
const amenitiesPool = ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Caja fuerte', 'Balcón', 'Vista al mar', 'Jacuzzi'];

export function generateRooms(count: number = 50): Room[] {
  const rooms: Room[] = [];
  
  for (let i = 1; i <= count; i++) {
    const floor = Math.ceil(i / 10);
    const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const baseRate = type === 'Suite' ? 350000 : type === 'Doble' ? 200000 : 120000;
    
    rooms.push({
      id: faker.string.uuid(),
      number: `${floor}${String(i % 10).padStart(2, '0')}`,
      floor,
      type,
      baseRateCOP: baseRate + faker.number.int({ min: -20000, max: 50000 }),
      status: faker.helpers.arrayElement(['Disponible', 'Disponible', 'Disponible', 'Ocupada', 'Mantenimiento']),
      amenities: faker.helpers.arrayElements(amenitiesPool, { min: 3, max: 6 }),
      capacity: type === 'Suite' ? 4 : type === 'Doble' ? 2 : 1,
    });
  }
  
  return rooms;
}

export function generateGuests(count: number = 200): Guest[] {
  const guests: Guest[] = [];
  
  for (let i = 0; i < count; i++) {
    guests.push({
      id: faker.string.uuid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: `+57 ${faker.number.int({ min: 300, max: 350 })} ${faker.number.int({ min: 100, max: 999 })} ${faker.number.int({ min: 1000, max: 9999 })}`,
      docType: faker.helpers.arrayElement(['CC', 'CE', 'Pasaporte']),
      docNumber: faker.number.int({ min: 10000000, max: 99999999 }).toString(),
      preferences: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }),
      createdAt: faker.date.past({ years: 2 }),
    });
  }
  
  return guests;
}

export function generateReservations(
  rooms: Room[],
  guests: Guest[],
  count: number = 250
): Reservation[] {
  const reservations: Reservation[] = [];
  const now = new Date();
  const statuses: ReservationStatus[] = ['pendiente', 'confirmada', 'check-in', 'check-out', 'cancelada', 'no-show'];
  const sources: ReservationSource[] = ['directa', 'booking', 'expedia', 'airbnb', 'telefono', 'correo'];
  
  // Track room occupancy to avoid overlaps
  const roomOccupancy = new Map<string, Array<{ start: Date; end: Date }>>();
  
  const availableRooms = rooms.filter(r => r.status === 'Disponible');
  
  for (let i = 0; i < count; i++) {
    const guest = faker.helpers.arrayElement(guests);
    const room = faker.helpers.arrayElement(availableRooms);
    
    // Generate dates within next 90 days
    const daysFromNow = faker.number.int({ min: -30, max: 90 });
    const checkIn = new Date(now);
    checkIn.setDate(checkIn.getDate() + daysFromNow);
    checkIn.setHours(15, 0, 0, 0); // 3 PM check-in
    
    const nights = faker.number.int({ min: 1, max: 7 });
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);
    checkOut.setHours(12, 0, 0, 0); // 12 PM check-out
    
    // Check for overlap
    const occupancy = roomOccupancy.get(room.id) || [];
    const hasOverlap = occupancy.some(
      period => checkIn < period.end && checkOut > period.start
    );
    
    if (hasOverlap && faker.datatype.boolean()) {
      // Skip this reservation to avoid overlap
      continue;
    }
    
    // Determine status based on dates
    let status: ReservationStatus;
    if (checkOut < now) {
      status = faker.helpers.arrayElement(['check-out', 'check-out', 'cancelada', 'no-show']);
    } else if (checkIn <= now && checkOut > now) {
      status = 'check-in';
    } else if (checkIn > now) {
      status = faker.helpers.arrayElement(['pendiente', 'confirmada', 'confirmada', 'confirmada']);
    } else {
      status = 'confirmada';
    }
    
    const reservation: Reservation = {
      id: faker.string.uuid(),
      code: `RSV${faker.number.int({ min: 100000, max: 999999 })}`,
      guestId: guest.id,
      roomId: room.id,
      roomType: room.type,
      checkIn,
      checkOut,
      status,
      source: faker.helpers.arrayElement(sources),
      occupants: faker.number.int({ min: 1, max: room.capacity }),
      notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.2 }),
      createdAt: faker.date.recent({ days: 30 }),
    };
    
    reservations.push(reservation);
    
    // Track occupancy
    if (!roomOccupancy.has(room.id)) {
      roomOccupancy.set(room.id, []);
    }
    roomOccupancy.get(room.id)!.push({ start: checkIn, end: checkOut });
  }
  
  return reservations;
}

export function generateUsers(): User[] {
  return [
    {
      id: '1',
      name: 'Admin Usuario',
      role: 'ADMIN',
      email: 'admin@hotel.com',
    },
    {
      id: '2',
      name: 'María Recepción',
      role: 'RECEPTION',
      email: 'recepcion@hotel.com',
    },
    {
      id: '3',
      name: 'Carlos Finanzas',
      role: 'FINANCE',
      email: 'finanzas@hotel.com',
    },
  ];
}
