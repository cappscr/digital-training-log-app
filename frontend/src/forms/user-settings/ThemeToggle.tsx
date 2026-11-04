import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { Field, FieldLabel } from '@/components/ui/field';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Monitor, Moon, Sun } from 'lucide-react';

interface ThemeToggleProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  formId: string;
  defaultValue: 'light' | 'dark' | 'system';
}

export function ThemeToggle<TFieldValues extends FieldValues>({
  control,
  defaultValue,
  formId,
  name,
}: ThemeToggleProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel htmlFor={`${formId}-${name}`}>Theme</FieldLabel>
          <ToggleGroup
            variant="outline"
            multiple={false}
            defaultValue={[defaultValue]}
            onValueChange={(value) => {
              if (value.length === 1) {
                field.onChange(value[0]);
              }
            }}
            spacing={0}
            value={field.value ? [field.value] : [defaultValue]}
            aria-label="Theme toggle"
          >
            <ToggleGroupItem value="light" aria-label="Toggle light">
              <Sun /> Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" aria-label="Toggle dark">
              <Moon /> Dark
            </ToggleGroupItem>
            <ToggleGroupItem value="system" aria-label="Toggle system">
              <Monitor /> System
            </ToggleGroupItem>
          </ToggleGroup>
        </Field>
      )}
    />
  );
}
