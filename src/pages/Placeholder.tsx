import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description?: string;
}

const Placeholder = ({ title, description }: PlaceholderProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-5 w-5 text-warning" />
            En Construcción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta sección está en desarrollo y estará disponible próximamente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Placeholder;
