import React, { useState, useEffect } from 'react';
import { PlusCircle, ListTodo, Archive } from 'lucide-react';
import TodoList from './components/TodoList';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [deadline, setDeadline] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        {
          id: crypto.randomUUID(),
          text: newTodo,
          completed: false,
          archived: false,
          ...(category && { category: category as Todo['category'] }),
          ...(priority && { priority: priority as Todo['priority'] }),
          ...(deadline && { deadline }),
        },
        ...todos,
      ]);
      setNewTodo('');
      setCategory('');
      setPriority('');
      setDeadline('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  };

  const archiveTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, archived: true } : todo
    ));
  };

  const activeTodos = todos.filter(todo => !todo.archived);
  const archivedTodos = todos.filter(todo => todo.archived);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <ListTodo className="text-blue-500" />
            タスク管理
          </h1>
          <p className="text-gray-600 mt-2">シンプルで使いやすいタスク管理ツール</p>
        </div>

        {!showArchived && (
          <form onSubmit={addTodo} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを入力..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <PlusCircle size={20} />
                追加
              </button>
            </div>

            <div className="flex gap-4 text-sm">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">カテゴリー</option>
                <option value="work">仕事</option>
                <option value="home">家庭</option>
                <option value="other">その他</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">優先度</option>
                <option value="high">高</option>
                <option value="medium">中</option>
                <option value="low">低</option>
              </select>

              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="px-3 py-1 border rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </form>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {showArchived ? 'アーカイブ済みタスク' : 'アクティブなタスク'}
          </h2>
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Archive size={18} />
            {showArchived ? 'アクティブなタスクを表示' : 'アーカイブを表示'}
          </button>
        </div>

        <TodoList
          todos={todos}
          showArchived={showArchived}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onArchive={archiveTodo}
        />

        <div className="mt-6 text-center text-sm text-gray-500">
          <div>
            アクティブなタスク: {activeTodos.length} (完了: {activeTodos.filter(t => t.completed).length})
          </div>
          <div>
            アーカイブ済み: {archivedTodos.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;