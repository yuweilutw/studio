import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CloudSun } from 'lucide-react';

type WeatherCardProps = {
  forecast: string;
  suggestions: string;
}

export function WeatherCard({ forecast, suggestions }: WeatherCardProps) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <CloudSun className="w-6 h-6 text-primary" />
          天氣與穿著
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold mb-1 font-body">天氣預報</h4>
          <p className="text-muted-foreground">{forecast}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-1 font-body">穿著建議</h4>
          <p className="text-muted-foreground">{suggestions}</p>
        </div>
      </CardContent>
    </Card>
  );
}
