export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  archived?: boolean;
  category?: 'work' | 'home' | 'other';
  priority?: 'high' | 'medium' | 'low';
  deadline?: string;
}

export type Category = '仕事' | '家庭' | 'その他';
export type Priority = '高' | '中' | '低';