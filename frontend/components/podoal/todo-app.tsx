'use client'

import { useState } from 'react'
import { toDateKey } from '@/lib/date'
import { AppHeader } from './app-header'
import { MonthCalendar } from './month-calendar'
import { TodoPanel } from './todo-panel'

export function TodoApp() {
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()))

  return (
    <div className="min-h-dvh bg-background">
      <AppHeader onToday={() => setSelectedDate(toDateKey(new Date()))} />
      <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-[320px_1fr] md:gap-8 md:px-6 md:py-10">
        <aside aria-label="날짜 선택">
          <MonthCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
        </aside>
        <TodoPanel date={selectedDate} onDateChange={setSelectedDate} />
      </main>
    </div>
  )
}
