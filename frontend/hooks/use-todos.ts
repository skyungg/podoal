'use client'

import useSWR, { useSWRConfig } from 'swr'
import { todoApi, type TodoInput } from '@/lib/todo-api'

const isTodosKey = (key: unknown) => Array.isArray(key) && key[0] === 'todos'

export function useTodos(date: string) {
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR(['todos', date], ([, d]) => todoApi.getTodos(d))

  const refresh = () => mutate(isTodosKey)

  return {
    todos: data ?? [],
    error,
    isLoading,
    createTodo: async (input: TodoInput) => {
      await todoApi.createTodo(input)
      await refresh()
    },
    updateTodo: async (id: number, input: TodoInput) => {
      await todoApi.updateTodo(id, input)
      await refresh()
    },
    deleteTodo: async (id: number) => {
      await todoApi.deleteTodo(id)
      await refresh()
    },
  }
}
