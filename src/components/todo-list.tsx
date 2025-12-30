import { Todo } from '@/types/todo';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todos: Todo[];
}

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm">
          タスクがありません。新しいタスクを追加してください。
        </p>
      </div>
    );
  }

  const completedTodos = todos.filter(todo => todo.completed);
  const incompleteTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          タスク ({incompleteTodos.length}/{todos.length})
        </h2>
      </div>
      
      <div className="space-y-2">
        {/* 未完了のタスクを先に表示 */}
        {incompleteTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        
        {/* 完了済みのタスクを後に表示 */}
        {completedTodos.length > 0 && (
          <>
            <div className="pt-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                完了済み ({completedTodos.length})
              </h3>
              <div className="space-y-2">
                {completedTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}