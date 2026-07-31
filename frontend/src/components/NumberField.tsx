import { useId } from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { ChevronUp, ChevronDown } from 'lucide-react';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '@/components/ui/input-group';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export function NumberField<T extends FieldValues>({
  id: idProp,
  label,
  name,
  control,
  size = 'icon-xs',
  surface,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  name: FieldPath<T>;
  control: Control<T>;
  size?: 'icon-xs' | 'icon-sm';
  surface?: 'transparent' | 'card' | 'background';
}) {
  const { field, fieldState } = useController({ name, control });
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = fieldState.isTouched && Boolean(fieldState.error);

  return (
    <BaseNumberField.Root
      {...other}
      value={field.value}
      onValueChange={(val) => field.onChange(val)}
      onBlur={field.onBlur}
      render={(props) => (
        <Field ref={props.ref} data-invalid={hasError} {...props}>
          {props.children}
        </Field>
      )}
    >
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <BaseNumberField.Input
        render={(props, state) => {
          const displayValue = state.focused
            ? state.inputValue
            : (field.value ?? '0');

          return (
            <InputGroup surface={surface}>
              <InputGroupInput
                id={id}
                aria-invalid={hasError}
                value={displayValue}
                disabled={state.disabled}
                required={state.required}
                onBlur={(e) => {
                  props.onBlur?.(e);
                  field.onBlur();
                }}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                onFocus={props.onFocus}
                {...props}
              />
              <InputGroupAddon align="inline-end">
                <div className="divide-border flex h-full flex-col divide-y">
                  <BaseNumberField.Increment
                    render={(props) => (
                      <InputGroupButton
                        {...props}
                        size={size}
                        aria-label="Increase"
                        className="flex-1 rounded-none"
                      />
                    )}
                  >
                    <ChevronUp />
                  </BaseNumberField.Increment>

                  <BaseNumberField.Decrement
                    render={(props) => (
                      <InputGroupButton
                        {...props}
                        size={size}
                        aria-label="Decrease"
                        className="flex-1 rounded-none"
                      />
                    )}
                  >
                    <ChevronDown />
                  </BaseNumberField.Decrement>
                </div>
              </InputGroupAddon>
            </InputGroup>
          );
        }}
      />
      {hasError && <FieldError>{fieldState.error?.message}</FieldError>}
    </BaseNumberField.Root>
  );
}
