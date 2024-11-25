import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Todo } from '../types';

interface TodoEditorProps {
  todo: Todo;
  onSave: (id: string, updates: Partial<Todo>) => void;
  onCancel: () => void;
}

export default function TodoEditor({ todo, onSave, onCancel }: TodoEditorProps) {
  const [editData, setEditData] = useState({
    text: todo.text,
    category: todo.category || '',
    priority: todo.priority || '',
    deadline: todo.deadline || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData.text.trim()) {
      onSave(todo.id, {
        text: editData.text,
        category: editData.category || undefined,
        priority: editData.priority || undefined,
        deadline: editData.deadline || undefined,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 space-y-3">
      <input
        type="text"
        value={editData.text}
        onChange={(e) => setEditData({ ...editData, text: e.target.value })}
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="タスクの内容"
        autoFocus
      />
      
      <div className="flex gap-3 text-sm">
        <select
          value={editData.category}
          onChange={(e) => setEditData({ ...editData, category: e.target.value })}
          className="px-3 py-1.5 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">カテゴリー</option>
          <option value="work">仕事</option>
          <option value="home">家庭</option>
          <option value="other">その他</option>
        </select>

        <select
          value={editData.priority}
          onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
          className="px-3 py-1.5 border rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">優先度</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>

        <input
          type="date"
          value={editData.deadline}
          onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
          className="px-3 py-1.5 border rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
        >
          <X size={16} />
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1"
        >
          <Check size={16} />
          保存
        </button>
      </div>
    </form>
  );
}