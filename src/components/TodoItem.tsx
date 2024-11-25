import React, { useState } from 'react';
import { Check, Edit2, Trash2, Archive } from 'lucide-react';
import { Todo } from '../types';
import TodoEditor from './TodoEditor';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onArchive: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onUpdate,
  onArchive,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  const priorityColors = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-green-50 border-green-200',
  };

  const categoryColors = {
    work: 'text-blue-600',
    home: 'text-green-600',
    other: 'text-purple-600',
  };

  const priorityLabels = {
    high: '高',
    medium: '中',
    low: '低',
  };

  const categoryLabels = {
    work: '仕事',
    home: '家庭',
    other: 'その他',
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <TodoEditor
          todo={todo}
          onSave={(id, updates) => {
            onUpdate(id, updates);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className={`group flex items-center gap-3 p-3 rounded-lg border ${
      todo.priority ? priorityColors[todo.priority] : 'bg-white border-gray-200'
    } transition-all`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded border ${
          todo.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
        } flex items-center justify-center transition-colors`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1">
        <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          {todo.text}
        </div>
        <div className="flex gap-2 mt-1 text-xs">
          {todo.category && (
            <span className={`${categoryColors[todo.category]} font-medium`}>
              {categoryLabels[todo.category]}
            </span>
          )}
          {todo.priority && (
            <span className="text-gray-600">
              優先度: {priorityLabels[todo.priority]}
            </span>
          )}
          {todo.deadline && (
            <span className="text-gray-600">
              期限: {new Date(todo.deadline).toLocaleDateString('ja-JP')}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {!todo.archived && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Edit2 size={18} />
            </button>
            {todo.completed && (
              <button
                onClick={() => onArchive(todo.id)}
                className="text-gray-500 hover:text-blue-600"
                title="アーカイブ"
              >
                <Archive size={18} />
              </button>
            )}
          </>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}