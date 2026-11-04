import type { ReactNode } from 'react'
import { PlusIcon } from 'lucide-react'

import { AppSidebar } from '@/components/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import type { Screen } from '@/mockups/screens'

const BREADCRUMBS: Record<Exclude<Screen, 'landing'>, [string, string]> = {
  sessions: ['Training Sessions', 'All sessions'],
  log: ['Training Sessions', 'Log a session'],
  pace: ['Calculators', 'Pace calculator'],
  palette: ['Mockups', 'Palette'],
}

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 font-semibold tracking-tight">
      <img src="/favicon.svg" alt="" className="size-8" />
      <span>Training Log</span>
    </button>
  )
}

export function AppShell({
  current,
  navigate,
  children,
}: {
  current: Exclude<Screen, 'landing'>
  navigate: (screen: Screen) => void
  children: ReactNode
}) {
  const [section, page] = BREADCRUMBS[current]

  return (
    <SidebarProvider>
      <AppSidebar current={current} navigate={navigate} />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background/90 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:inline-flex">{section}</BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{page}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {current !== 'log' && current !== 'sessions' && (
            <Button size="icon" className="mr-4 md:hidden" aria-label="Log session" onClick={() => navigate('log')}>
              <PlusIcon />
            </Button>
          )}
        </header>
        <div className="@container flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
