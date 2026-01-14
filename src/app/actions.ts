"use server";

import {
  generatePersonalizedTravelChecklist,
  type GeneratePersonalizedTravelChecklistInput
} from "@/ai/flows/generate-personalized-travel-checklist";
import {
  provideWeatherAndAttireSuggestions,
  type WeatherAndAttireInput
} from "@/ai/flows/provide-weather-and-attire-suggestions";
import {
  offerTransportationTips,
  type OfferTransportationTipsInput
} from "@/ai/flows/offer-transportation-tips";
import {
  estimateCostRange,
  type EstimateCostRangeInput
} from "@/ai/flows/estimate-cost-range";
import type { FormSchema, TravelSuggestions } from "@/lib/types";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { differenceInDays } from 'date-fns';

const findImage = (location: string) => {
  const defaultImage = PlaceHolderImages.find(img => img.id === 'default') || PlaceHolderImages[0];
  if (!location) return defaultImage;

  const lowerCaseLocation = location.toLowerCase();
  const foundImage = PlaceHolderImages.find(img => lowerCaseLocation.includes(img.id));

  return foundImage || defaultImage;
};

export async function getTravelSuggestions(
  data: FormSchema
): Promise<TravelSuggestions | { error: string }> {
  try {
    const { location, dateRange, travelTheme, ageRange, preferences } = data;
    
    // Calculate duration in days. Add 1 to include both start and end dates.
    const duration = differenceInDays(dateRange.to, dateRange.from) + 1;

    const checklistInput: GeneratePersonalizedTravelChecklistInput = {
      location,
      duration,
      travelTheme,
      ageRange,
      preferences,
    };

    const weatherInput: WeatherAndAttireInput = {
      travelDestination: location,
      travelDays: duration,
      startDate: dateRange.from.toISOString(),
      endDate: dateRange.to.toISOString(),
    };

    const transportInput: OfferTransportationTipsInput = {
      destination: location,
      travelPreferences: preferences,
      duration,
    };

    const costInput: EstimateCostRangeInput = {
      destination: location,
      duration,
    };

    const [checklistRes, weatherRes, transportRes, costRes] = await Promise.all([
      generatePersonalizedTravelChecklist(checklistInput),
      provideWeatherAndAttireSuggestions(weatherInput),
      offerTransportationTips(transportInput),
      estimateCostRange(costInput),
    ]);
    
    const image = findImage(location);

    return {
      checklist: checklistRes.checklist,
      weather: {
        weatherForecast: weatherRes.weatherForecast,
        clothingSuggestions: weatherRes.clothingSuggestions,
      },
      transport: {
        transportationTips: transportRes.transportationTips,
      },
      cost: {
        costRange: costRes.costRange,
      },
      image: {
        imageUrl: image.imageUrl,
        imageHint: image.imageHint,
        description: image.description,
      },
    };
  } catch (e) {
    console.error(e);
    return { error: "無法產生旅遊建議，請稍後再試。" };
  }
}