import { useEffect } from 'react';
import { useDataStore } from '@/lib/stores/data-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BedDouble, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { formatCOP } from '@/lib/utils/currency';
import { formatDate } from '@/lib/utils/dates';

const Dashboard = () => {
  const { rooms, reservations, initialized, initialize } = useDataStore();

  useEffect(() => {
    if (!initialized) {
      initialize();
    }
  }, [initialized, initialize]);

  // Calculate dashboard stats
  const today = new Date();
  const occupiedRooms = rooms.filter(r => r.status === 'Ocupada').length;
  const occupancyRate = rooms.length > 0 ? (occupiedRooms / rooms.length) * 100 : 0;
  
  const checkInsToday = reservations.filter(r => {
    const checkIn = new Date(r.checkIn);
    return checkIn.toDateString() === today.toDateString() && r.status === 'confirmada';
  }).length;

  const checkOutsToday = reservations.filter(r => {
    const checkOut = new Date(r.checkOut);
    return checkOut.toDateString() === today.toDateString() && r.status === 'check-in';
  }).length;

  const pendingReservations = reservations.filter(r => r.status === 'pendiente').length;

  // Calculate estimated revenue for this month
  const currentMonth = today.getMonth();
  const monthlyReservations = reservations.filter(r => {
    const checkIn = new Date(r.checkIn);
    return checkIn.getMonth() === currentMonth && (r.status === 'confirmada' || r.status === 'check-in');
  });

  const estimatedRevenue = monthlyReservations.reduce((sum, r) => {
    const room = rooms.find(room => room.id === r.roomId);
    if (!room) return sum;
    const nights = Math.ceil((new Date(r.checkOut).getTime() - new Date(r.checkIn).getTime()) / (1000 * 60 * 60 * 24));
    return sum + (room.baseRateCOP * nights);
  }, 0);

  // Prepare chart data for last 7 days
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date;
  });

  const occupancyData = last7Days.map(date => {
    const activeReservations = reservations.filter(r => {
      const checkIn = new Date(r.checkIn);
      const checkOut = new Date(r.checkOut);
      return checkIn <= date && checkOut > date && (r.status === 'check-in' || r.status === 'confirmada');
    }).length;
    
    return {
      date: formatDate(date, 'dd/MM'),
      ocupación: rooms.length > 0 ? Math.round((activeReservations / rooms.length) * 100) : 0,
    };
  });

  const stats = [
    {
      title: 'Ocupación Hoy',
      value: `${occupancyRate.toFixed(1)}%`,
      icon: BedDouble,
      description: `${occupiedRooms} de ${rooms.length} habitaciones`,
    },
    {
      title: 'Ingresos Estimados',
      value: formatCOP(estimatedRevenue),
      icon: DollarSign,
      description: 'Este mes',
    },
    {
      title: 'Check-ins Hoy',
      value: checkInsToday.toString(),
      icon: Calendar,
      description: 'Llegadas programadas',
    },
    {
      title: 'Reservas Pendientes',
      value: pendingReservations.toString(),
      icon: TrendingUp,
      description: 'Por confirmar',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Resumen general del hotel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ocupación Últimos 7 Días</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ocupación" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución por Tipo de Habitación</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { tipo: 'Sencilla', cantidad: rooms.filter(r => r.type === 'Sencilla').length },
                { tipo: 'Doble', cantidad: rooms.filter(r => r.type === 'Doble').length },
                { tipo: 'Suite', cantidad: rooms.filter(r => r.type === 'Suite').length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
