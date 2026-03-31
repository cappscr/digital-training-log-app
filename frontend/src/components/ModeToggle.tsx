import { Monitor, Moon, Sun } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function ModeToggle() {
  return (
    <ToggleGroup variant="outline" multiple>
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
