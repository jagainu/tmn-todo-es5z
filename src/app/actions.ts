"use server";

import { revalidatePath } from 'next/cache';
import { createTodo, toggleTodoComplete, editTodoTitle, removeTodo } from '@/lib/todo-service';

export async function addTodoAction(title: string) {
  try {
    await createTodo(title);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to add todo:', error);
    throw new Error('Failed to add todo');
  }
}

export async function toggleTodoAction(id: string) {
  try {
    await toggleTodoComplete(id);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to toggle todo:', error);
    throw new Error('Failed to toggle todo');
  }
}

export async function editTodoAction(id: string, title: string) {
  try {
    await editTodoTitle(id, title);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to edit todo:', error);
    throw new Error('Failed to edit todo');
  }
}

export async function deleteTodoAction(id: string) {
  try {
    await removeTodo(id);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw new Error('Failed to delete todo');
  }
}