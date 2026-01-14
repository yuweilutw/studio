'use server';

/**
 * @fileOverview Generates a personalized travel checklist based on user inputs.
 *
 * - generatePersonalizedTravelChecklist - A function that generates the checklist.
 * - GeneratePersonalizedTravelChecklistInput - The input type for the generatePersonalizedTravelChecklist function.
 * - GeneratePersonalizedTravelChecklistOutput - The return type for the generatePersonalizedTravelChecklist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePersonalizedTravelChecklistInputSchema = z.object({
  location: z.string().describe('The destination of the trip.'),
  duration: z.number().describe('The number of days of the trip.'),
  travelTheme: z.string().describe('The theme of the trip (e.g., adventure, relaxation, cultural).'),
  ageRange: z.string().describe('The age range of the traveler (e.g., 25-35, 36-50, 51+).'),
  preferences: z.array(z.string()).describe('A list of travel preferences (e.g., hiking, museums, food).'),
});
export type GeneratePersonalizedTravelChecklistInput = z.infer<typeof GeneratePersonalizedTravelChecklistInputSchema>;

const GeneratePersonalizedTravelChecklistOutputSchema = z.object({
  checklist: z.array(z.string()).describe('A list of items to pack for the trip.'),
});
export type GeneratePersonalizedTravelChecklistOutput = z.infer<typeof GeneratePersonalizedTravelChecklistOutputSchema>;

export async function generatePersonalizedTravelChecklist(
  input: GeneratePersonalizedTravelChecklistInput
): Promise<GeneratePersonalizedTravelChecklistOutput> {
  return generatePersonalizedTravelChecklistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTravelChecklistPrompt',
  input: {schema: GeneratePersonalizedTravelChecklistInputSchema},
  output: {schema: GeneratePersonalizedTravelChecklistOutputSchema},
  prompt: `You are a travel expert who creates personalized travel checklists. Based on the user's inputs below, create a checklist of items they should pack for their trip. Consider the location, duration, travel theme, age range, and preferences to create a comprehensive and helpful checklist. Respond in Traditional Chinese.

Location: {{{location}}}
Duration: {{{duration}}} days
Travel Theme: {{{travelTheme}}}
Age Range: {{{ageRange}}}
Preferences: {{#each preferences}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Checklist:`,
});

const generatePersonalizedTravelChecklistFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTravelChecklistFlow',
    inputSchema: GeneratePersonalizedTravelChecklistInputSchema,
    outputSchema: GeneratePersonalizedTravelChecklistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
