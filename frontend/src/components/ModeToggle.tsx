import { Monitor, Moon, Sun } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useTheme } from '@/components/ThemeProvider';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <ToggleGroup
      variant="outline"
      multiple={false}
      defaultValue={['system']}
      onValueChange={(value) => {
        if (value.length === 1) {
          setTheme(value[0] as 'light' | 'dark' | 'system');
        }
      }}
      aria-label="Theme toggle"
    >
      <ToggleGroupItem value="light" aria-label="Toggle light">
        <Sun />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark">
        <Moon />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle system">
        <Monitor />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
