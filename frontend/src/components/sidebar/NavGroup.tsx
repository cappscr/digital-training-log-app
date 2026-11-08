import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

type NavLink = {
  title: string;
  url: string;
  icon?: LucideIcon;
};

export type NavGroupItem = NavLink & {
  items: { title: string; url: string }[];
};

export type NavItem = NavLink | NavGroupItem;

export const NavGroup = ({
  item,
  pathname,
}: {
  item: NavGroupItem;
  pathname: string;
}) => {
  const containsRoute =
    pathname === item.url || pathname.startsWith(`${item.url}/`);
  const childIsCurrent =
    item.items?.some((subItem) => pathname === subItem.url) ?? false;
  const [open, setOpen] = useState(containsRoute);

  const isActive = (url: string, exact: boolean = false) =>
    exact ? pathname === url : pathname.startsWith(url);

  useEffect(() => {
    if (containsRoute) {
      (async () => {
        await setOpen(true);
      })();
    }
  }, [pathname, containsRoute]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
      render={<SidebarMenuItem />}
    >
      <SidebarMenuButton
        tooltip={item.title}
        isActive={containsRoute && !childIsCurrent}
        render={<CollapsibleTrigger />}
      >
        {item.icon && <item.icon />}
        <span>{item.title}</span>
        <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </SidebarMenuButton>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.items.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton
                isActive={isActive(subItem.url, true)}
                render={<Link to={subItem.url} />}
              >
                {subItem.title}
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
};
