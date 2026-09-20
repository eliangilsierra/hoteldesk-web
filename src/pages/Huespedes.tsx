import { useEffect, useState } from 'react';
import { useDataStore } from '@/lib/stores/data-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Mail, Phone } from 'lucide-react';
import { formatDate } from '@/lib/utils/dates';

const Huespedes = () => {
  const { guests, reservations, initialized, initialize } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const filteredGuests = guests.filter(g => {
    const searchLower = searchQuery.toLowerCase();
    return (
      g.fullName.toLowerCase().includes(searchLower) ||
      g.email.toLowerCase().includes(searchLower) ||
      g.docNumber.includes(searchQuery)
    );
  }).slice(0, 50);

  const getGuestStats = (guestId: string) => {
    const guestReservations = reservations.filter(r => r.guestId === guestId);
    const completedStays = guestReservations.filter(r => r.status === 'check-out').length;
    const activeReservations = guestReservations.filter(r => 
      r.status === 'check-in' || r.status === 'confirmada'
    ).length;

    return { completedStays, activeReservations };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Huéspedes</h1>
          <p className="text-muted-foreground">
            Gestiona la base de datos de huéspedes
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Huésped
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, correo o documento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Estancias</TableHead>
                <TableHead>Registro</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => {
                const stats = getGuestStats(guest.id);
                
                return (
                  <TableRow key={guest.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{guest.fullName}</div>
                        {guest.preferences && (
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {guest.preferences}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <Badge variant="outline" className="mb-1">
                          {guest.docType}
                        </Badge>
                        <div className="text-muted-foreground">{guest.docNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{guest.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span>{guest.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{stats.completedStays} completadas</div>
                        {stats.activeReservations > 0 && (
                          <div className="text-xs text-primary">
                            {stats.activeReservations} activas
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(guest.createdAt)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {filteredGuests.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">
              No se encontraron huéspedes
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Huespedes;
