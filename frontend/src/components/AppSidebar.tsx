import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Header } from '@/components/sidebar/Header';

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <span>Content</span>
      </SidebarContent>
      <SidebarFooter>
        <span>Footer</span>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
