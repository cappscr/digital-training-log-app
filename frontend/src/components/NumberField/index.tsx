import { useId } from 'react';
import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useField } from 'formik';
import FormHelperText from '@mui/material/FormHelperText';

export function NumberField({
  id: idProp,
  label,
  name,
  size = 'medium',
  fullWidth = false,
  maxWidth,
  ...other
}: BaseNumberField.Root.Props & {
  label?: React.ReactNode;
  name: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  maxWidth?: number;
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
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={hasError}
          variant="outlined"
          fullWidth={fullWidth}
        >
          {props.children}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        render={(props, state) => {
          const displayValue = state.focused
            ? state.inputValue
            : (field.value ?? '0');

          return (
            <OutlinedInput
              id={id}
              label={label}
              inputRef={props.ref}
              error={hasError}
              value={displayValue}
              onBlur={(e) => {
                props.onBlur?.(e);
                helpers.setTouched(true);
              }}
              onChange={props.onChange}
              onKeyUp={props.onKeyUp}
              onKeyDown={props.onKeyDown}
              onFocus={props.onFocus}
              slotProps={{
                input: props,
              }}
              endAdornment={
                <InputAdornment
                  position="end"
                  sx={{
                    flexDirection: 'column',
                    maxHeight: 'unset',
                    alignSelf: 'stretch',
                    borderLeft: '1px solid',
                    borderColor: 'divider',
                    ml: 0,
                    '& button': {
                      py: 0,
                      flex: 1,
                      borderRadius: 0.5,
                    },
                  }}
                >
                  <BaseNumberField.Increment
                    render={<IconButton size={size} aria-label="Increase" />}
                  >
                    <KeyboardArrowUpIcon
                      fontSize={size}
                      sx={{ transform: 'translateY(2px)' }}
                    />
                  </BaseNumberField.Increment>

                  <BaseNumberField.Decrement
                    render={<IconButton size={size} aria-label="Decrease" />}
                  >
                    <KeyboardArrowDownIcon
                      fontSize={size}
                      sx={{ transform: 'translateY(-2px)' }}
                    />
                  </BaseNumberField.Decrement>
                </InputAdornment>
              }
              sx={{
                pr: 0,
                ...(maxWidth && !fullWidth ? { maxWidth } : {}),
              }}
            />
          );
        }}
      />
      {hasError && (
        <FormHelperText sx={{ ml: 0, '&:empty': { mt: 0 } }}>
          {meta.error}
        </FormHelperText>
      )}
    </BaseNumberField.Root>
  );
}
