import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

type CostCardProps = {
  range: string;
}

export function CostCard({ range }: CostCardProps) {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Wallet className="w-6 h-6 text-primary" />
          大致花費
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold font-headline text-foreground">{range}</p>
        <p className="text-xs text-muted-foreground">此為預估區間，實際花費可能有所變動</p>
      </CardContent>
    </Card>
  );
}
