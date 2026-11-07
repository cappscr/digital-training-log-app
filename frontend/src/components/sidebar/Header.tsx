import { useNavigate } from 'react-router';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppIcon from '@/assets/icon.svg';

export const Header = () => {
  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="flex flex-row gap-2"
          onClick={() => navigate('/')}
        >
          <img src={AppIcon} alt="App Icon" className="size-8" />
          <div className="flex flex-col gap-1">
            <span>Training Log</span>
            <span className="text-muted-foreground text-xs">{today}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
