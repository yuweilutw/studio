import { z } from "zod";

export const formSchema = z.object({
  location: z.string().min(2, { message: "請輸入至少 2 個字元" }),
  dateRange: z.object({
    from: z.date({
      required_error: "請選擇開始日期",
    }),
    to: z.date({
      required_error: "請選擇結束日期",
    }),
  }, {
    required_error: "請選擇日期區間",
    invalid_type_error: "請選擇日期區間",
  }).refine((data) => data.to >= data.from, {
    message: "結束日期不能早於開始日期",
    path: ["to"],
  }),
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