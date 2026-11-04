import { useEffect, useRef, useState } from 'react'
import { MonitorIcon, MoonIcon, SmartphoneIcon, SunIcon, TabletIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { AppShell } from '@/mockups/AppShell'
import { LandingPage } from '@/mockups/LandingPage'
import { LogSessionPage } from '@/mockups/LogSessionPage'
import { PaceCalculatorPage } from '@/mockups/PaceCalculatorPage'
import { PalettePage } from '@/mockups/PalettePage'
import { SCREENS, type Screen } from '@/mockups/screens'
import { SessionsListPage } from '@/mockups/SessionsListPage'

type Viewport = 'mobile' | 'tablet' | 'desktop'

type Scheme = 'complementary' | 'analogous'

type FrameMessage =
  | { type: 'screen'; screen: Screen }
  | { type: 'dark'; dark: boolean }
  | { type: 'scheme'; scheme: Scheme }

const FRAME_SIZE: Record<Viewport, string> = {
  mobile: 'w-[390px] h-[min(844px,calc(100svh-7rem))] rounded-[2rem] border-8 border-neutral-800',
  tablet: 'w-[820px] h-[min(1180px,calc(100svh-7rem))] rounded-[1.5rem] border-8 border-neutral-800',
  desktop: 'w-full h-[calc(100svh-3rem)]',
}

const params = new URLSearchParams(window.location.search)
const isEmbedded = params.has('embed')

const isScreen = (id: string | null): id is Screen => SCREENS.some((s) => s.id === id)

// `?screen=`, `?dark`, and `?scheme=` let tools that own the hash (like Figma capture) load a specific state.
function screenFromHash(): Screen {
  const id = window.location.hash.replace('#', '')
  if (isScreen(id)) return id
  const fromQuery = params.get('screen')
  return isScreen(fromQuery) ? fromQuery : 'landing'
}

if (isEmbedded) {
  document.documentElement.classList.toggle('dark', params.has('dark'))
  document.documentElement.classList.toggle('analogous', params.get('scheme') === 'analogous')
}

export default function App() {
  return isEmbedded ? <EmbeddedApp /> : <MockupViewer />
}

function EmbeddedApp() {
  const [screen, setScreen] = useState<Screen>(screenFromHash)

  useEffect(() => {
    const onHash = () => {
      const next = screenFromHash()
      setScreen(next)
      window.scrollTo({ top: 0 })
      window.parent.postMessage({ type: 'screen', screen: next } satisfies FrameMessage, '*')
    }
    const onMessage = (e: MessageEvent<FrameMessage>) => {
      if (e.data?.type === 'dark') document.documentElement.classList.toggle('dark', e.data.dark)
      if (e.data?.type === 'scheme') document.documentElement.classList.toggle('analogous', e.data.scheme === 'analogous')
    }
    window.addEventListener('hashchange', onHash)
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('message', onMessage)
    }
  }, [])

  const navigate = (next: Screen) => {
    window.location.hash = next
  }

  return (
    <TooltipProvider>
      <div className="@container min-h-svh">
        {screen === 'landing' ? (
          <LandingPage navigate={navigate} />
        ) : (
          <AppShell current={screen} navigate={navigate}>
            {screen === 'sessions' && <SessionsListPage navigate={navigate} />}
            {screen === 'log' && <LogSessionPage navigate={navigate} />}
            {screen === 'pace' && <PaceCalculatorPage />}
            {screen === 'palette' && <PalettePage />}
          </AppShell>
        )}
      </div>
    </TooltipProvider>
  )
}

function MockupViewer() {
  const [screen, setScreen] = useState<Screen>(screenFromHash)
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [dark, setDark] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const initialScreen = useRef(screen)
  const darkRef = useRef(dark)
  const [scheme, setScheme] = useState<Scheme>('complementary')
  const schemeRef = useRef(scheme)

  useEffect(() => {
    const onMessage = (e: MessageEvent<FrameMessage>) => {
      if (e.data?.type !== 'screen') return
      setScreen(e.data.screen)
      initialScreen.current = e.data.screen
      history.replaceState(null, '', `#${e.data.screen}`)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  useEffect(() => {
    darkRef.current = dark
    frameRef.current?.contentWindow?.postMessage({ type: 'dark', dark } satisfies FrameMessage, '*')
  }, [dark])

  useEffect(() => {
    schemeRef.current = scheme
    frameRef.current?.contentWindow?.postMessage({ type: 'scheme', scheme } satisfies FrameMessage, '*')
  }, [scheme])

  const navigate = (next: Screen) => {
    const frameWindow = frameRef.current?.contentWindow
    if (frameWindow) frameWindow.location.hash = next
  }

  const framed = viewport !== 'desktop'

  return (
    <TooltipProvider>
      <div className={cn('flex h-svh flex-col overflow-hidden', framed ? 'bg-neutral-200' : 'bg-white')}>
        <div className="flex h-12 shrink-0 items-center gap-3 border-b border-neutral-800 bg-neutral-950 px-4 text-neutral-50">
          <span className="text-xs font-medium tracking-wide uppercase opacity-60">Mockups</span>
          <Tabs value={screen} onValueChange={(v) => navigate(v as Screen)}>
            <TabsList className="bg-neutral-800">
              {SCREENS.map((s) => (
                <TabsTrigger
                  key={s.id}
                  value={s.id}
                  className="text-neutral-400 hover:text-neutral-50 data-active:bg-neutral-50 data-active:text-neutral-950"
                >
                  {s.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="ml-auto flex items-center gap-2">
            <ToggleGroup
              value={[scheme]}
              onValueChange={(v) => v[0] && setScheme(v[0] as Scheme)}
              size="sm"
              aria-label="Color scheme"
            >
              {(
                [
                  ['complementary', 'Complementary', ['bg-volt-300', 'bg-iris-600']],
                  ['analogous', 'Analogous', ['bg-ember-300', 'bg-volt-300', 'bg-fern-300']],
                ] as const
              ).map(([value, label, swatches]) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  className="gap-1.5 text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50 aria-pressed:bg-neutral-700"
                >
                  <span className="flex -space-x-1">
                    {swatches.map((s) => (
                      <span key={s} className={cn('size-3 rounded-full ring-2 ring-neutral-950', s)} />
                    ))}
                  </span>
                  {label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <div className="h-5 w-px bg-neutral-700" />
            <ToggleGroup
              value={[viewport]}
              onValueChange={(v) => v[0] && setViewport(v[0] as Viewport)}
              size="sm"
            >
              {(
                [
                  ['mobile', 'Mobile', SmartphoneIcon],
                  ['tablet', 'Tablet', TabletIcon],
                  ['desktop', 'Desktop', MonitorIcon],
                ] as const
              ).map(([value, label, Icon]) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  aria-label={label}
                  className="text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50 aria-pressed:bg-neutral-700"
                >
                  <Icon />
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <Button
              size="icon-sm"
              variant="ghost"
              aria-label="Toggle dark mode"
              className="text-neutral-50 hover:bg-neutral-800 hover:text-neutral-50"
              onClick={() => setDark(!dark)}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>
        </div>

        <div className={cn('flex flex-1 justify-center overflow-auto', framed && 'py-6')}>
          <iframe
            key={viewport}
            ref={frameRef}
            title="Mockup preview"
            src={`/?embed#${initialScreen.current}`}
            onLoad={(e) => {
              const frameWindow = e.currentTarget.contentWindow
              frameWindow?.postMessage({ type: 'dark', dark: darkRef.current } satisfies FrameMessage, '*')
              frameWindow?.postMessage({ type: 'scheme', scheme: schemeRef.current } satisfies FrameMessage, '*')
            }}
            className={cn('shrink-0 bg-white', FRAME_SIZE[viewport])}
          />
        </div>
      </div>
    </TooltipProvider>
  )
}
