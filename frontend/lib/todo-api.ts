import { toDateKey } from '@/lib/date'

export interface Todo {
  id: number
  content: string
  date: string
}

export interface TodoInput {
  content: string
  date: string
}

// Set NEXT_PUBLIC_API_BASE_URL (e.g. http://localhost:8080) to call the Spring Boot API.
// Without it, an in-memory mock keeps the UI usable until the backend is connected.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// Temporary until authentication exists on the backend.
const USER_ID = 1

interface TodoItemResponse {
  todoItemId: number
  content: string
  completed: boolean
}

async function send(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!res.ok) throw new Error(`요청에 실패했습니다 (${res.status})`)
  return res
}

// The list response has no date, so the requested date is attached to each item.
const toTodo = (item: TodoItemResponse, date: string): Todo => ({
  id: item.todoItemId,
  content: item.content,
  date,
})

const today = toDateKey(new Date())
let mockTodos: Todo[] = [
  { id: 1, content: '주간 회의 자료 준비하기', date: today },
  { id: 2, content: '운동 30분 하기', date: today },
  { id: 3, content: '읽던 책 한 챕터 마무리', date: today },
]
let nextId = 4
const delay = () => new Promise((r) => setTimeout(r, 200))

const mockApi = {
  async getTodos(date: string) {
    await delay()
    return mockTodos.filter((t) => t.date === date)
  },
  async createTodo(input: TodoInput) {
    await delay()
    const todo = { id: nextId++, ...input }
    mockTodos = [...mockTodos, todo]
    return todo
  },
  async updateTodo(id: number, input: TodoInput) {
    await delay()
    const todo = { id, ...input }
    mockTodos = mockTodos.map((t) => (t.id === id ? todo : t))
    return todo
  },
  async deleteTodo(id: number) {
    await delay()
    mockTodos = mockTodos.filter((t) => t.id !== id)
  },
}

const remoteApi = {
  async getTodos(date: string): Promise<Todo[]> {
    const params = new URLSearchParams({
      userId: String(USER_ID),
      localDate: date,
  })
    const res = await send(`/api/todos?${params}`)
    const items: TodoItemResponse[] = await res.json()
    return items.map((item) => toTodo(item, date))
  },
  async createTodo(input: TodoInput): Promise<void> {
    await send('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ userId: USER_ID, content: input.content, todoDate: input.date }),
    })
  },
  async updateTodo(id: number, input: TodoInput): Promise<void> {
    await send(`/api/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ content: input.content, todoDate: input.date }),
    })
  },
  async deleteTodo(id: number): Promise<void> {
    await send(`/api/todos/${id}`, { method: 'DELETE' })
  },
}

export const todoApi = API_BASE_URL ? remoteApi : mockApi
