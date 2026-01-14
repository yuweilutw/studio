'use client';

import type { TravelSuggestions } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Compass } from 'lucide-react';
import { ImageCard } from './result-cards/image-card';
import { WeatherCard } from './result-cards/weather-card';
import { TransportCard } from './result-cards/transport-card';
import { CostCard } from './result-cards/cost-card';
import { ChecklistCard } from './result-cards/checklist-card';

type WanderWiseResultsProps = {
  suggestions: TravelSuggestions | null;
  isLoading: boolean;
  location: string;
};

const ResultSkeletons = () => (
  <div className="space-y-8">
    <Skeleton className="h-64 w-full rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl" />
      <Skeleton className="h-48 w-full rounded-2xl md:col-span-2" />
    </div>
  </div>
);

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center text-center h-full bg-card/50 rounded-2xl p-8 shadow-inner border border-dashed">
    <Compass className="w-24 h-24 text-muted-foreground/30 mb-4" />
    <h3 className="font-headline text-2xl font-semibold mb-2">準備好探索世界了嗎？</h3>
    <p className="text-muted-foreground max-w-sm">在左側填寫您的旅遊偏好，讓我們為您產生個人化的旅遊建議！</p>
  </div>
);


export function WanderWiseResults({ suggestions, isLoading, location }: WanderWiseResultsProps) {
  if (isLoading) {
    return <ResultSkeletons />;
  }

  if (!suggestions) {
    return <WelcomeMessage />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <ImageCard
        imageUrl={suggestions.image.imageUrl}
        imageHint={suggestions.image.imageHint}
        description={suggestions.image.description}
        location={location}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeatherCard
          forecast={suggestions.weather.weatherForecast}
          suggestions={suggestions.weather.clothingSuggestions}
        />
        <TransportCard tips={suggestions.transport.transportationTips} />
        <CostCard range={suggestions.cost.costRange} />
        <ChecklistCard items={suggestions.checklist} />
      </div>
    </div>
  );
}
