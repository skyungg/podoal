'use client'

import { formatDateLabel } from '@/lib/date'
import { useTodos } from '@/hooks/use-todos'
import { TodoAddForm } from './todo-add-form'
import { TodoItem } from './todo-item'

interface TodoPanelProps {
  date: string
  onDateChange: (date: string) => void
}

export function TodoPanel({ date, onDateChange }: TodoPanelProps) {
  const { todos, error, isLoading, createTodo, updateTodo, deleteTodo } = useTodos(date)

  return (
    <section aria-labelledby="todo-heading" className="flex min-w-0 flex-col gap-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">선택한 날짜</p>
          <h1 id="todo-heading" className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
            {formatDateLabel(date)}
          </h1>
        </div>
        <p className="shrink-0 rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
          {todos.length}개
        </p>
      </div>

      <TodoAddForm onAdd={(content) => createTodo({ content, date })} />

      {error ? (
        <p role="alert" className="rounded-xl border border-destructive/30 px-4 py-6 text-center text-sm text-destructive">
          할 일을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      ) : isLoading ? (
        <ul className="flex flex-col gap-2" aria-busy="true" aria-label="불러오는 중">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </ul>
      ) : todos.length === 0 ? (
        <div className="rounded-xl border border-dashed px-4 py-12 text-center">
          <p className="font-medium">등록된 할 일이 없습니다</p>
          <p className="mt-1 text-sm text-muted-foreground">위 입력창에서 새로운 할 일을 추가해 보세요.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onUpdate={async (input) => {
                await updateTodo(todo.id, input)
                if (input.date !== date) onDateChange(input.date)
              }}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
