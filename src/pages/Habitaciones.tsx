import { useEffect, useState } from 'react';
import { useDataStore } from '@/lib/stores/data-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BadgeStatus } from '@/components/ui/badge-status';
import { Plus, Search } from 'lucide-react';
import { formatCOP } from '@/lib/utils/currency';

const Habitaciones = () => {
  const { rooms, initialized, initialize } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  const filteredRooms = rooms.filter(r => {
    const searchLower = searchQuery.toLowerCase();
    return (
      r.number.toLowerCase().includes(searchLower) ||
      r.type.toLowerCase().includes(searchLower) ||
      r.status.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Habitaciones</h1>
          <p className="text-muted-foreground">
            Gestiona el inventario de habitaciones
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nueva Habitación
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por número, tipo o estado..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{room.number}</h3>
                  <p className="text-sm text-muted-foreground">Piso {room.floor}</p>
                </div>
                <BadgeStatus status={room.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{room.type}</span>
                <Badge variant="secondary">{room.capacity} pers.</Badge>
              </div>
              
              <div className="text-lg font-bold text-primary">
                {formatCOP(room.baseRateCOP)}
                <span className="text-xs font-normal text-muted-foreground">/noche</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {room.amenities.slice(0, 3).map((amenity) => (
                  <Badge key={amenity} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {room.amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{room.amenities.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No se encontraron habitaciones
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Habitaciones;
