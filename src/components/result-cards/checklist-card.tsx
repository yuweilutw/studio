import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type ChecklistCardProps = {
  items: string[];
}

export function ChecklistCard({ items }: ChecklistCardProps) {
  return (
    <Card className="shadow-lg rounded-2xl md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <CheckSquare className="w-6 h-6 text-primary" />
          旅遊 Checklist
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 p-2 rounded-md transition-colors hover:bg-muted/50">
               <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-primary">
                <CheckSquare className="h-3 w-3 text-primary/80" />
              </div>
              <span className="text-sm text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
