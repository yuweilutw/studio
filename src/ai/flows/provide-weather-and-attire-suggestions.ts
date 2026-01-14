'use server';

/**
 * @fileOverview This file defines a Genkit flow to provide weather forecasts and clothing suggestions for a given travel destination.
 *
 * - provideWeatherAndAttireSuggestions - A function that takes travel destination, travel days and return weather forecasts and appropriate clothing suggestions.
 * - WeatherAndAttireInput - The input type for the provideWeatherAndAttireSuggestions function.
 * - WeatherAndAttireOutput - The return type for the provideWeatherAndAttireSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WeatherAndAttireInputSchema = z.object({
  travelDestination: z.string().describe('The travel destination.'),
  travelDays: z.number().describe('The number of travel days.'),
});
export type WeatherAndAttireInput = z.infer<typeof WeatherAndAttireInputSchema>;

const WeatherAndAttireOutputSchema = z.object({
  weatherForecast: z.string().describe('The weather forecast for the travel destination.'),
  clothingSuggestions: z.string().describe('Clothing suggestions for the travel destination based on the weather.'),
});
export type WeatherAndAttireOutput = z.infer<typeof WeatherAndAttireOutputSchema>;

export async function provideWeatherAndAttireSuggestions(input: WeatherAndAttireInput): Promise<WeatherAndAttireOutput> {
  return provideWeatherAndAttireSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherAndAttirePrompt',
  input: {schema: WeatherAndAttireInputSchema},
  output: {schema: WeatherAndAttireOutputSchema},
  prompt: `You are a travel expert. Provide a concise weather forecast and clothing suggestions for a trip to {{{travelDestination}}} lasting {{{travelDays}}} days.\n\nWeather Forecast:\nClothing Suggestions: `,
});

const provideWeatherAndAttireSuggestionsFlow = ai.defineFlow(
  {
    name: 'provideWeatherAndAttireSuggestionsFlow',
    inputSchema: WeatherAndAttireInputSchema,
    outputSchema: WeatherAndAttireOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
