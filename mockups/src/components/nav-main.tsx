import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"
import type { Screen } from "@/mockups/screens"

export type NavSection = {
  title: string
  icon: React.ReactNode
  items: { title: string; screen?: Screen }[]
}

export function NavMain({
  sections,
  current,
  navigate,
}: {
  sections: NavSection[]
  current: Screen
  navigate: (screen: Screen) => void
}) {
  const { state, isMobile, setOpenMobile } = useSidebar()

  const go = (screen: Screen) => {
    navigate(screen)
    if (isMobile) setOpenMobile(false)
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {sections.map((section) => {
          const containsCurrent = section.items.some((i) => i.screen === current)
          const firstScreen = section.items.find((i) => i.screen)?.screen
          return (
            <Collapsible
              key={section.title}
              defaultOpen={containsCurrent}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger
                render={
                  <SidebarMenuButton
                    tooltip={section.title}
                    isActive={state === "collapsed" && containsCurrent}
                    onClick={() => {
                      if (state === "collapsed" && !isMobile && firstScreen) go(firstScreen)
                    }}
                  />
                }
              >
                {section.icon}
                <span>{section.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {section.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        render={<button type="button" />}
                        isActive={item.screen === current}
                        aria-disabled={!item.screen}
                        onClick={() => item.screen && go(item.screen)}
                        className="w-full"
                      >
                        <span>{item.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
