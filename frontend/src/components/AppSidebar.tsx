import { NotepadTextIcon, CalculatorIcon, SettingsIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { AddTrainingSessionButton } from '@/components/sidebar/AddTrainingSessionButton';
import { Header } from '@/components/sidebar/Header';
import { NavMain } from '@/components/sidebar/NavMain';

const navMainItems = [
  {
    title: 'Training Sessions',
    url: '/training-sessions',
    icon: NotepadTextIcon,
    items: [
      {
        title: 'All Training Sessions',
        url: '/training-sessions',
      },
      {
        title: 'Log a Session',
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
        title: 'Pace Calculator',
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <AddTrainingSessionButton />
        <NavMain items={navMainItems} />
      </SidebarContent>
      <SidebarFooter>
        <span>Footer</span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
