import * as React from "react"

import { NavMain, type NavSection } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { BookOpenIcon, CalculatorIcon, PlusIcon, Settings2Icon } from "lucide-react"
import type { Screen } from "@/mockups/screens"

const user = {
  name: "Chris Capps",
  email: "chris@example.com",
  initials: "CC",
}

const sections: NavSection[] = [
  {
    title: "Training Sessions",
    icon: <BookOpenIcon />,
    items: [
      { title: "All sessions", screen: "sessions" },
      { title: "Log a session", screen: "log" },
      { title: "Templates" },
    ],
  },
  {
    title: "Calculators",
    icon: <CalculatorIcon />,
    items: [{ title: "Pace calculator", screen: "pace" }],
  },
  {
    title: "Settings",
    icon: <Settings2Icon />,
    items: [
      { title: "Profile" },
      { title: "Units & preferences" },
      { title: "Sharing & coaches" },
      { title: "Account" },
    ],
  },
]

export function AppSidebar({
  current,
  navigate,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  current: Screen
  navigate: (screen: Screen) => void
}) {
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={() => navigate("sessions")}>
              <img src="/favicon.svg" alt="" className="aspect-square size-8 shrink-0" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Training Log</span>
                <span className="truncate text-xs text-sidebar-foreground/70">Week 43 · 2026</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Log session"
                onClick={() => {
                  navigate("log")
                  if (isMobile) setOpenMobile(false)
                }}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground active:bg-secondary/80 active:text-secondary-foreground"
              >
                <PlusIcon />
                <span>Log session</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <NavMain sections={sections} current={current} navigate={navigate} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onLogOut={() => navigate("landing")} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
