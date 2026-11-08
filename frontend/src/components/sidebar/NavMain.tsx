import { Link, useLocation } from 'react-router';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavGroup, type NavItem } from './NavGroup';

export const NavMain = ({ items }: { items: NavItem[] }) => {
  const location = useLocation();
  const isActive = (url: string, exact: boolean = false) =>
    exact ? location.pathname === url : location.pathname.startsWith(url);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) =>
          'items' in item ? (
            <NavGroup
              key={item.title}
              item={item}
              pathname={location.pathname}
            />
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive(item.url, true)}
                render={<Link to={item.url} />}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
