import * as React from 'react';
import { format, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

/**
 * Component for selection of date including time of day.
 */
export function DateTimePicker({ date, setDate }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date);

  const handleSelect: SelectSingleEventHandler = (_, selected) => {
    const modifiedDay = new Date(selected);

    setSelectedDate(modifiedDay);
    setDate(modifiedDay);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!selectedDate) return;
    const { value } = e.target;
    const hours = Number.parseInt(value.split(':')[0] || '00', 10);
    const minutes = Number.parseInt(value.split(':')[1] || '00', 10);
    const modifiedDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      hours,
      minutes,
    );

    // New time must be higher than current time.
    if (modifiedDay <= new Date()) return;

    setSelectedDate(modifiedDay);
    setDate(modifiedDay);
  };

  const footer = (
    <div className="px-4 pt-4 pb-4">
      <Input type="time" onChange={handleTimeChange} value={selectedDate ? format(selectedDate, 'HH:mm') : '00:00'} />
    </div>
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="z-10">
        <Button
          variant={'outline'}
          className={cn('w-[280px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <div className="pt-1">
            {selectedDate ? (
              format(selectedDate, "PP 'a las' HH:mm", { locale: es })
            ) : (
              <span>Selecciona una fecha</span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          disabled={(date) => date < startOfDay(new Date())}
          initialFocus
          footer={footer}
        />
      </PopoverContent>
    </Popover>
  );
}
