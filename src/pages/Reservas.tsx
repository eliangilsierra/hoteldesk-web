import { useEffect, useState } from 'react';
import { useDataStore } from '@/lib/stores/data-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BadgeStatus } from '@/components/ui/badge-status';
import { Plus, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils/dates';
import { formatCOP } from '@/lib/utils/currency';

const Reservas = () => {
  const { reservations, guests, rooms, initialized, initialize } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const filteredReservations = reservations.filter(r => {
    const guest = guests.find(g => g.id === r.guestId);
    const searchLower = searchQuery.toLowerCase();
    
    return (
      r.code.toLowerCase().includes(searchLower) ||
      guest?.fullName.toLowerCase().includes(searchLower) ||
      r.status.toLowerCase().includes(searchLower)
    );
  }).slice(0, 50); // Limit to 50 for performance

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservas</h1>
          <p className="text-muted-foreground">
            Gestiona todas las reservas del hotel
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Reserva
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por código, huésped o estado..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Huésped</TableHead>
                <TableHead>Habitación</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fuente</TableHead>
                <TableHead className="text-right">Tarifa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReservations.map((reservation) => {
                const guest = guests.find(g => g.id === reservation.guestId);
                const room = rooms.find(r => r.id === reservation.roomId);
                const nights = Math.ceil(
                  (new Date(reservation.checkOut).getTime() - new Date(reservation.checkIn).getTime()) 
                  / (1000 * 60 * 60 * 24)
                );
                const totalCost = room ? room.baseRateCOP * nights : 0;

                return (
                  <TableRow key={reservation.id}>
                    <TableCell className="font-medium">{reservation.code}</TableCell>
                    <TableCell>{guest?.fullName || 'N/A'}</TableCell>
                    <TableCell>{room?.number || reservation.roomType}</TableCell>
                    <TableCell>{formatDate(reservation.checkIn)}</TableCell>
                    <TableCell>{formatDate(reservation.checkOut)}</TableCell>
                    <TableCell>
                      <BadgeStatus status={reservation.status} />
                    </TableCell>
                    <TableCell className="capitalize">{reservation.source}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCOP(totalCost)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredReservations.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No se encontraron reservas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservas;
