'use client'

import { useState, type FormEvent } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Todo, TodoInput } from '@/lib/todo-api'

interface TodoItemProps {
  todo: Todo
  onUpdate: (input: TodoInput) => Promise<void>
  onDelete: () => Promise<void>
}

const fieldClass =
  'h-10 rounded-lg border border-input bg-background px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 md:text-sm'

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(todo.content)
  const [date, setDate] = useState(todo.date)
  const [pending, setPending] = useState(false)

  const startEdit = () => {
    setContent(todo.content)
    setDate(todo.date)
    setEditing(true)
  }

  const run = async (action: () => Promise<void>) => {
    setPending(true)
    try {
      await action()
    } finally {
      setPending(false)
    }
  }

  const handleSave = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || !date) return
    run(async () => {
      await onUpdate({ content: trimmed, date })
      setEditing(false)
    })
  }

  if (editing) {
    return (
      <li className="rounded-xl border border-primary/40 bg-accent/40 p-3">
        <form onSubmit={handleSave} className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sr-only" htmlFor={`content-${todo.id}`}>
            할 일 내용
          </label>
          <input
            id={`content-${todo.id}`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={200}
            autoFocus
            className={`${fieldClass} min-w-0 flex-1`}
          />
          <label className="sr-only" htmlFor={`date-${todo.id}`}>
            날짜
          </label>
          <input
            id={`date-${todo.id}`}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className={`${fieldClass} sm:w-40`}
          />
          <div className="flex gap-2">
            <Button type="button" variant="outline" className="h-10 flex-1 sm:flex-none" onClick={() => setEditing(false)}>
              취소
            </Button>
            <Button type="submit" className="h-10 flex-1 sm:flex-none" disabled={!content.trim() || pending}>
              저장
            </Button>
          </div>
        </form>
      </li>
    )
  }

  return (
    <li className="group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-colors hover:border-primary/30">
      <span aria-hidden className="size-2 shrink-0 rounded-full bg-primary/60" />
      <p className="min-w-0 flex-1 break-words leading-relaxed">{todo.content}</p>
      <div className="flex shrink-0 gap-1">
        <Button variant="ghost" size="icon" onClick={startEdit} aria-label={`"${todo.content}" 수정`}>
          <Pencil />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive"
          disabled={pending}
          onClick={() => run(onDelete)}
          aria-label={`"${todo.content}" 삭제`}
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  )
}
