import { z } from "zod";

export const formSchema = z.object({
  location: z.string().min(2, { message: "請輸入至少 2 個字元" }),
  duration: z.number().min(1).max(30),
  travelTheme: z.enum(["adventure", "relaxation", "cultural", "party"], {
    errorMap: () => ({ message: "請選擇一個旅遊情境" }),
  }),
  ageRange: z.enum(["18-24", "25-35", "36-50", "51+"], {
    errorMap: () => ({ message: "請選擇您的年齡區間" }),
  }),
  preferences: z.array(z.string()).min(1, { message: "請至少選擇一項偏好" }),
});

export type FormSchema = z.infer<typeof formSchema>;

export type TravelSuggestions = {
  checklist: string[];
  weather: {
    weatherForecast: string;
    clothingSuggestions: string;
  };
  transport: {
    transportationTips: string;
  };
  cost: {
    costRange: string;
  };
  image: {
    imageUrl: string;
    imageHint: string;
    description: string;
  };
};
