import { TodoList } from '@/components/todo-list';
import { AddTodoForm } from '@/components/add-todo-form';
import { getTodos } from '@/lib/todo-service';

export default async function HomePage() {
  const todos = await getTodos();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Todo App
        </h1>
        <p className="text-muted-foreground">
          シンプルで使いやすいToDoアプリケーション
        </p>
      </div>
      
      <div className="space-y-6">
        <AddTodoForm />
        <TodoList todos={todos} />
      </div>
    </div>
  );
}