import { createClient } from '@supabase/supabase-js';

// ТОЛЬКО ОДИН РАЗ объявляем переменные!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://wwabadskjxbjbnsncenn.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3YWJhZHNranhiamJuc25jZW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjU5NjQsImV4cCI6MjA3ODgwMTk2NH0.C6OfxzK3_bsiBEhlK_0qNrvbScFJV8j65QrJlC4tZIM';

// Проверка для отладки
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:');
  console.log('VITE_SUPABASE_URL:', supabaseUrl);
  console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '***' : 'undefined');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lesson = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string | null;
  duration: number;
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

export type Teacher = {
  id: string;
  name: string;
  bio: string;
  avatar_url: string;
  specialization: string;
  created_at: string;
};