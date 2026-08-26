import { useState } from 'react';
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateAndTimePickerProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  formId: string;
  dateName: FieldPath<TFieldValues>;
  timeName: FieldPath<TFieldValues>;
}

export const DateAndTimePicker = <TFieldValues extends FieldValues>({
  control,
  formId,
  dateName,
  timeName,
}: DateAndTimePickerProps<TFieldValues>) => {
  const [open, setOpen] = useState(false);

  return (
    <FieldGroup className="max-w-xs flex-row">
      <Controller
        control={control}
        name={dateName}
        render={({ field, fieldState }) => (
          <Field className="text-foreground">
            <FieldLabel htmlFor={`${formId}-${dateName}`}>Date</FieldLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                render={
                  <Button
                    variant="outline"
                    id={`${formId}-${dateName}`}
                    className="w-32 justify-between font-normal"
                  >
                    {field.value ? format(field.value, 'PPP') : 'Select date'}
                    <ChevronDownIcon data-icon="inline-end" />
                  </Button>
                }
              />
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  captionLayout="dropdown"
                  defaultMonth={field.value}
                  onSelect={(date) => {
                    field.onChange(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={control}
        name={timeName}
        render={({ field, fieldState }) => (
          <Field className="w-32">
            <FieldLabel htmlFor={`${formId}-${timeName}`}>Time</FieldLabel>
            <Input
              type="time"
              {...field}
              id={`${formId}-${timeName}`}
              aria-invalid={fieldState.invalid}
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
};
