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
import { useField } from 'formik';

export function NumberField({
  id: idProp,
  label,
  name,
  size = 'icon-xs',
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  name: string;
  size?: 'icon-xs' | 'icon-sm';
}) {
  const [field, meta, helpers] = useField(name);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const hasError = meta.touched && Boolean(meta.error);

  return (
    <BaseNumberField.Root
      {...other}
      value={field.value}
      onValueChange={(val) => helpers.setValue(val)}
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
            <InputGroup>
              <InputGroupInput
                id={id}
                aria-invalid={hasError}
                value={displayValue}
                disabled={state.disabled}
                required={state.required}
                onBlur={(e) => {
                  props.onBlur?.(e);
                  helpers.setTouched(true);
                }}
                onChange={props.onChange}
                onKeyUp={props.onKeyUp}
                onKeyDown={props.onKeyDown}
                onFocus={props.onFocus}
                {...props}
              />
              <InputGroupAddon align="inline-end">
                <BaseNumberField.Increment
                  render={(props) => (
                    <InputGroupButton
                      {...props}
                      size={size}
                      aria-label="Increase"
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
                    />
                  )}
                >
                  <ChevronDown />
                </BaseNumberField.Decrement>
              </InputGroupAddon>
            </InputGroup>
          );
        }}
      />
      {hasError && <FieldError>{meta.error}</FieldError>}
    </BaseNumberField.Root>
  );
}
