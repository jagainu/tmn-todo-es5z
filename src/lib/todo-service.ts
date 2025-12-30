import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/types/todo';
import { getAllTodos, addTodo, updateTodo, deleteTodo } from '@/lib/kv';

export async function getTodos(): Promise<Todo[]> {
  const todos = await getAllTodos();
  return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createTodo(title: string): Promise<Todo> {
  const todo: Todo = {
    id: uuidv4(),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  
  await addTodo(todo);
  return todo;
}

export async function toggleTodoComplete(id: string): Promise<void> {
  const todos = await getAllTodos();
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    throw new Error('Todo not found');
  }
  
  await updateTodo(id, { completed: !todo.completed });
}

export async function editTodoTitle(id: string, title: string): Promise<void> {
  const trimmedTitle = title.trim();
  
  if (!trimmedTitle) {
    throw new Error('Title cannot be empty');
  }
  
  await updateTodo(id, { title: trimmedTitle });
}

export async function removeTodo(id: string): Promise<void> {
  await deleteTodo(id);
}