import { cn } from '@/lib/utils';
import { Badge } from './badge';
import type { ReservationStatus, RoomStatus, PaymentStatus } from '@/lib/types';

interface BadgeStatusProps {
  status: ReservationStatus | RoomStatus | PaymentStatus;
  className?: string;
}

const statusConfig = {
  // Reservation statuses
  'pendiente': { variant: 'secondary' as const, label: 'Pendiente' },
  'confirmada': { variant: 'default' as const, label: 'Confirmada' },
  'check-in': { variant: 'default' as const, label: 'Check-in' },
  'check-out': { variant: 'default' as const, label: 'Check-out' },
  'cancelada': { variant: 'destructive' as const, label: 'Cancelada' },
  'no-show': { variant: 'destructive' as const, label: 'No Show' },
  
  // Room statuses
  'Disponible': { variant: 'default' as const, label: 'Disponible' },
  'Ocupada': { variant: 'secondary' as const, label: 'Ocupada' },
  'Mantenimiento': { variant: 'destructive' as const, label: 'Mantenimiento' },
  
  // Payment statuses
  'pagado': { variant: 'default' as const, label: 'Pagado' },
  'parcial': { variant: 'secondary' as const, label: 'Parcial' },
};

export function BadgeStatus({ status, className }: BadgeStatusProps) {
  const config = statusConfig[status] || { variant: 'secondary' as const, label: status };
  
  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
