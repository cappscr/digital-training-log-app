import { NotepadTextIcon, CalculatorIcon, SettingsIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LogTrainingSessionButton } from '@/components/sidebar/LogTrainingSessionButton';
import { Header } from '@/components/sidebar/Header';
import { NavMain } from '@/components/sidebar/NavMain';
import { NavUser } from '@/components/sidebar/NavUser';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import type { NavItem } from '@/components/sidebar/NavGroup';

const navMainItems: NavItem[] = [
  {
    title: 'Training Sessions',
    url: '/training-sessions',
    icon: NotepadTextIcon,
    items: [
      {
        title: 'All sessions',
        url: '/training-sessions',
      },
      {
        title: 'Log a session',
        url: '/training-sessions/new',
      },
    ],
  },
  {
    title: 'Calculators',
    url: '/calculators',
    icon: CalculatorIcon,
    items: [
      {
        title: 'Pace calculator',
        url: '/calculators/pace-calculator',
      },
    ],
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: SettingsIcon,
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <LogTrainingSessionButton />
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
