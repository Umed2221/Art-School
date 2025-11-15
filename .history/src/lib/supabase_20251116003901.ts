import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;


// Добавь проверку для отладки
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '***' : 'undefined');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseUrl = 'https://wwabadskjxbjbnsncenn.supabase.co'
const supabaseAnonKey 

export type Lesson = {
  id: string;
  title: string;
  description: string; // исправлено: было strings
  thumbnail_url: string;
  video_url: string | null;
  duration: number; // исправлено: было numbers
  level: 'beginner' | 'intermediate' | 'advanced';
  technique: string;
  category: string;
  materials: string[];
  teacher_id: string;
  views: number;
  rating: number;
  created_at: string;
  teacher?: Teacher;
};

export type Teacher = { // исправлено: было export type Teacher = []
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  specialization: string; // исправлено: убрали "o"
  created_at: string;
};