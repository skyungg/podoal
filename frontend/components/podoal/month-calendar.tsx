'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { WEEKDAYS, fromDateKey, getMonthGrid, toDateKey } from '@/lib/date'

interface MonthCalendarProps {
  selectedDate: string
  onSelect: (date: string) => void
}

export function MonthCalendar({ selectedDate, onSelect }: MonthCalendarProps) {
  const selected = fromDateKey(selectedDate)
  const [view, setView] = useState({ year: selected.getFullYear(), month: selected.getMonth() })
  const [prevSelected, setPrevSelected] = useState(selectedDate)

  if (prevSelected !== selectedDate) {
    setPrevSelected(selectedDate)
    setView({ year: selected.getFullYear(), month: selected.getMonth() })
  }

  const todayKey = toDateKey(new Date())
  const days = getMonthGrid(view.year, view.month)

  const shiftMonth = (delta: number) => {
    const next = new Date(view.year, view.month + delta, 1)
    setView({ year: next.getFullYear(), month: next.getMonth() })
  }

  return (
    <section className="rounded-2xl border bg-card p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold" aria-live="polite">
          {view.year}년 {view.month + 1}월
        </h2>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => shiftMonth(-1)} aria-label="이전 달">
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => shiftMonth(1)} aria-label="다음 달">
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((day, i) => (
          <div key={day} className={cn('py-2', i === 0 && 'text-destructive/80')}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = toDateKey(day)
          const isSelected = key === selectedDate
          const isToday = key === todayKey
          const inMonth = day.getMonth() === view.month
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={isSelected}
              aria-label={`${day.getMonth() + 1}월 ${day.getDate()}일${isToday ? ', 오늘' : ''}`}
              className={cn(
                'flex aspect-square items-center justify-center rounded-lg text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                inMonth ? 'text-foreground' : 'text-muted-foreground/50',
                !isSelected && 'hover:bg-accent',
                isToday && !isSelected && 'font-semibold text-primary ring-1 ring-primary/40',
                isSelected && 'bg-primary font-semibold text-primary-foreground',
              )}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
    </section>
  )
}
