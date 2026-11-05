import { Button } from '@/components/ui/button'

export function AppHeader({ onToday }: { onToday: () => void }) {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full bg-primary" />
          <span className="text-lg font-bold tracking-tight">Podoal</span>
        </div>
        <Button variant="outline" size="sm" onClick={onToday}>
          오늘
        </Button>
      </div>
    </header>
  )
}
