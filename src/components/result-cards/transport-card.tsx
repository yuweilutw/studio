import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Car } from 'lucide-react';

type TransportCardProps = {
  tips: string;
}

export function TransportCard({ tips }: TransportCardProps) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Car className="w-6 h-6 text-primary" />
          交通方式
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p className="text-muted-foreground">{tips}</p>
      </CardContent>
    </Card>
  );
}
