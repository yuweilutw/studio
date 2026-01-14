'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating the cost range of a trip based on the destination and duration.
 *
 * - estimateCostRange - A function that estimates the cost range of a trip.
 * - EstimateCostRangeInput - The input type for the estimateCostRange function.
 * - EstimateCostRangeOutput - The return type for the estimateCostRange function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateCostRangeInputSchema = z.object({
  destination: z.string().describe('The destination of the trip.'),
  duration: z.number().describe('The duration of the trip in days.'),
});
export type EstimateCostRangeInput = z.infer<typeof EstimateCostRangeInputSchema>;

const EstimateCostRangeOutputSchema = z.object({
  costRange: z.string().describe('An estimated cost range for the trip.'),
});
export type EstimateCostRangeOutput = z.infer<typeof EstimateCostRangeOutputSchema>;

export async function estimateCostRange(input: EstimateCostRangeInput): Promise<EstimateCostRangeOutput> {
  return estimateCostRangeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateCostRangePrompt',
  input: {schema: EstimateCostRangeInputSchema},
  output: {schema: EstimateCostRangeOutputSchema},
  prompt: `You are a travel expert. Estimate the cost range for a trip to {{destination}} lasting {{duration}} days. Consider accommodation, food, transportation, and activities. Provide the cost range in TWD. Be brief and to the point. Respond in Traditional Chinese.
`,
});

const estimateCostRangeFlow = ai.defineFlow(
  {
    name: 'estimateCostRangeFlow',
    inputSchema: EstimateCostRangeInputSchema,
    outputSchema: EstimateCostRangeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
