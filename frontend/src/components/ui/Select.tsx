import { Select as SelectPrimitive } from '@base-ui/react/select';
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-react';
import styles from './Select.module.css';

export const Select = ({
  options,
  label,
  showLabel = true,
  ...props
}: {
  options: { label: string; value: string }[];
  label: string;
  showLabel?: boolean;
}) => {
  return (
    <SelectPrimitive.Root items={options} {...props}>
      {showLabel && (
        <SelectPrimitive.Label className={styles.label}>
          {label}
        </SelectPrimitive.Label>
      )}
      <SelectPrimitive.Trigger className={styles.select}>
        <SelectPrimitive.Value
          className={styles.value}
          placeholder={`Select ${label.toLowerCase()}`}
        />
        <SelectPrimitive.Icon className={styles.selectIcon}>
          <ChevronsUpDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          className={styles.positioner}
          sideOffset={8}
        >
          <SelectPrimitive.Popup className={styles.popup}>
            <SelectPrimitive.ScrollUpArrow className={styles.scrollArrow} />
            <SelectPrimitive.List className={styles.list}>
              {options.map(({ label, value }) => (
                <SelectPrimitive.Item
                  key={label}
                  value={value}
                  className={styles.item}
                >
                  <SelectPrimitive.ItemIndicator
                    className={styles.itemIndicator}
                  >
                    <CheckIcon className={styles.itemIndicatorIcon} />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText className={styles.itemText}>
                    {label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
            <SelectPrimitive.ScrollDownArrow className={styles.scrollArrow} />
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};
