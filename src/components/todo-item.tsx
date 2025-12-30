"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Todo } from '@/types/todo';
import { toggleTodoAction, editTodoAction, deleteTodoAction } from '@/app/actions';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await toggleTodoAction(todo.id);
      router.refresh();
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    try {
      await editTodoAction(todo.id, editTitle);
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Failed to edit todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await deleteTodoAction(todo.id);
      router.refresh();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        disabled={isUpdating}
        aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isUpdating}
              className="flex-1"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSaveEdit}
              disabled={isUpdating || !editTitle.trim()}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelEdit}
              disabled={isUpdating}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <span
            className={cn(
              "block text-sm truncate",
              todo.completed && "line-through text-muted-foreground"
            )}
          >
            {todo.title}
          </span>
        )}
      </div>
      
      {!isEditing && (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEdit}
            disabled={isUpdating}
            aria-label={`Edit ${todo.title}`}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            disabled={isUpdating}
            className="text-destructive hover:text-destructive"
            aria-label={`Delete ${todo.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}