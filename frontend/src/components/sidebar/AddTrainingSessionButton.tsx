import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from 'cn';
import { buttonVariants } from '@/components/ui/button';
import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const AddTrainingSessionButton = () => {
  const { state, isMobile } = useSidebar();

  return (
    <SidebarMenu className="p-2">
      <SidebarMenuItem>
        <Tooltip>
          <TooltipTrigger
            render={
              <Link
                to="/training-sessions/new"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'default' }),
                  'w-full group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0',
                )}
              />
            }
          >
            <PlusIcon />
            <span className="group-data-[collapsible=icon]:hidden">
              Add Training Session
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            hidden={state !== 'collapsed' || isMobile}
          >
            Add Training Session
          </TooltipContent>
        </Tooltip>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
