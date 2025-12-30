import { kv } from '@vercel/kv';
import { Todo } from '@/types/todo';

const TODOS_KEY = 'todos';

export async function getAllTodos(): Promise<Todo[]> {
  try {
    const todos = await kv.get<Todo[]>(TODOS_KEY);
    return todos || [];
  } catch (error) {
    console.error('Failed to get todos:', error);
    return [];
  }
}

export async function saveTodos(todos: Todo[]): Promise<void> {
  try {
    await kv.set(TODOS_KEY, todos);
  } catch (error) {
    console.error('Failed to save todos:', error);
    throw new Error('Failed to save todos');
  }
}

export async function addTodo(todo: Todo): Promise<void> {
  const todos = await getAllTodos();
  todos.push(todo);
  await saveTodos(todos);
}

export async function updateTodo(id: string, updates: Partial<Omit<Todo, 'id'>>): Promise<void> {
  const todos = await getAllTodos();
  const index = todos.findIndex(todo => todo.id === id);
  
  if (index === -1) {
    throw new Error('Todo not found');
  }
  
  todos[index] = { ...todos[index], ...updates };
  await saveTodos(todos);
}

export async function deleteTodo(id: string): Promise<void> {
  const todos = await getAllTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  await saveTodos(filteredTodos);
}