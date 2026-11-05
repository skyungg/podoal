'use client'

import { useState, type FormEvent } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TodoAddForm({ onAdd }: { onAdd: (content: string) => Promise<void> }) {
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || pending) return
    setPending(true)
    try {
      await onAdd(trimmed)
      setContent('')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="new-todo" className="sr-only">
        새로운 할 일
      </label>
      <input
        id="new-todo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="할 일을 입력하세요"
        maxLength={200}
        autoComplete="off"
        className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-base outline-none transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 md:text-sm"
      />
      <Button type="submit" className="h-11 rounded-xl px-4" disabled={!content.trim() || pending}>
        <Plus data-icon="inline-start" />
        추가
      </Button>
    </form>
  )
}
