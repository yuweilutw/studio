'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import type { FormSchema } from '@/lib/types';
import { formSchema } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { zhTW } from 'date-fns/locale';

const travelThemes = [
  { id: 'adventure', label: '探險' },
  { id: 'relaxation', label: '放鬆' },
  { id: 'cultural', label: '文化' },
  { id: 'party', label: '派對' },
];

const ageRanges = ["18-24", "25-35", "36-50", "51+"];

const preferences = [
  { id: 'hiking', label: '登山' },
  { id: 'museums', label: '博物館' },
  { id: 'food', label: '美食' },
  { id: 'nightlife', label: '夜生活' },
  { id: 'shopping', label: '購物' },
];

type WanderWiseFormProps = {
  onSubmit: (data: FormSchema) => void;
  isLoading: boolean;
};

export function WanderWiseForm({ onSubmit, isLoading }: WanderWiseFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: '',
      preferences: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>旅遊地點</FormLabel>
              <FormControl>
                <Input placeholder="例如：東京" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>出遊日期</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "yyyy/MM/dd")} -{" "}
                            {format(field.value.to, "yyyy/MM/dd")}
                          </>
                        ) : (
                          format(field.value.from, "yyyy/MM/dd")
                        )
                      ) : (
                        <span>選擇日期</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={zhTW}
                    initialFocus
                    mode="range"
                    defaultMonth={field.value?.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                    disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="travelTheme"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>旅遊情境</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {travelThemes.map((theme) => (
                    <FormItem key={theme.id} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={theme.id} />
                      </FormControl>
                      <FormLabel className="font-normal">{theme.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ageRange"
          render={({ field }) => (
             <FormItem className="space-y-3">
              <FormLabel>年齡區間</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {ageRanges.map((age) => (
                    <FormItem key={age} className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={age} />
                      </FormControl>
                      <FormLabel className="font-normal">{age}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="preferences"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>旅遊喜好</FormLabel>
              </div>
              <div className="flex flex-wrap gap-4">
              {preferences.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="preferences"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-2 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              建議產生中...
            </>
          ) : (
            '產生旅遊建議'
          )}
        </Button>
      </form>
    </Form>
  );
}
