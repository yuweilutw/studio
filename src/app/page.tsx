'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTravelSuggestions } from '@/app/actions';
import type { FormSchema, TravelSuggestions } from '@/lib/types';
import { WanderWiseForm } from '@/components/wanderwise-form';
import { WanderWiseResults } from '@/components/wanderwise-results';
import { Header } from '@/components/header';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [suggestions, setSuggestions] = useState<TravelSuggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState('');
  const { toast } = useToast();

  const handleFormSubmit = async (data: FormSchema) => {
    setIsLoading(true);
    setSuggestions(null);
    setLastLocation(data.location);

    const result = await getTravelSuggestions(data);

    if ('error' in result) {
      toast({
        variant: 'destructive',
        title: '發生錯誤',
        description: result.error,
      });
    } else {
      setSuggestions(result);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <aside className="lg:col-span-1">
            <div className="sticky top-8 bg-card/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border">
              <h2 className="font-headline text-2xl font-semibold mb-1">
                規劃你的旅程
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">告訴我們你的喜好，AI 為你量身打造</p>
              <Separator className="mb-6"/>
              <WanderWiseForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          </aside>
          <section className="lg:col-span-2">
            <WanderWiseResults suggestions={suggestions} isLoading={isLoading} location={lastLocation} />
          </section>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Powered by WanderWise</p>
      </footer>
    </div>
  );
}
