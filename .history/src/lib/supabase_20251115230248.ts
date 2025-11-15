import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
