import React from 'react';
import { Archive } from 'lucide-react';
import TodoItem from './TodoItem';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  showArchived: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onArchive: (id: string) => void;
}

export default function TodoList({
  todos,
  showArchived,
  onToggle,
  onDelete,
  onUpdate,
  onArchive,
}: TodoListProps) {
  const filteredTodos = todos.filter(todo => todo.archived === showArchived);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {showArchived ? 'アーカイブされたタスクはありません' : 'タスクがありません'}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
}