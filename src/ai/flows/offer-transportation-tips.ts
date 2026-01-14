'use server';

/**
 * @fileOverview A flow for offering insights into local transportation options and advice for a travel destination.
 *
 * - offerTransportationTips - A function that handles the process of providing transportation tips.
 * - OfferTransportationTipsInput - The input type for the offerTransportationTips function.
 * - OfferTransportationTipsOutput - The return type for the offerTransportationTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OfferTransportationTipsInputSchema = z.object({
  destination: z.string().describe('The travel destination.'),
  travelPreferences: z.array(z.string()).describe('The traveler\'s preferences, e.g., budget, luxury, adventure.'),
  duration: z.number().describe('The duration of the trip in days.'),
});
export type OfferTransportationTipsInput = z.infer<typeof OfferTransportationTipsInputSchema>;

const OfferTransportationTipsOutputSchema = z.object({
  transportationTips: z.string().describe('Insights into local transportation options and advice.'),
});
export type OfferTransportationTipsOutput = z.infer<typeof OfferTransportationTipsOutputSchema>;

export async function offerTransportationTips(input: OfferTransportationTipsInput): Promise<OfferTransportationTipsOutput> {
  return offerTransportationTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'offerTransportationTipsPrompt',
  input: {schema: OfferTransportationTipsInputSchema},
  output: {schema: OfferTransportationTipsOutputSchema},
  prompt: `You are an expert travel advisor. A user is planning a trip to {{destination}} for {{duration}} days. They have the following preferences: {{travelPreferences}}. Offer insights into local transportation options, including cost-effective and convenient choices. Consider factors like safety, accessibility, and local customs related to transportation. Provide practical advice and tips to help them navigate transportation in {{destination}} efficiently. Return the information in the format of transportationTips, taking into consideration the travel duration and travel preferences. Respond in Traditional Chinese.
`,
});

const offerTransportationTipsFlow = ai.defineFlow(
  {
    name: 'offerTransportationTipsFlow',
    inputSchema: OfferTransportationTipsInputSchema,
    outputSchema: OfferTransportationTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
