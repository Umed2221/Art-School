/*
  # Art School Database Schema

  ## Overview
  Creates the complete database structure for an art school learning platform
  with lessons, teachers, user progress tracking, and community features.

  ## New Tables

  ### teachers
  - `id` (uuid, primary key)
  - `name` (text) - Teacher's full name
  - `bio` (text) - Teacher biography
  - `avatar_url` (text) - Profile picture URL
  - `specialization` (text) - Area of expertise
  - `created_at` (timestamptz)

  ### lessons
  - `id` (uuid, primary key)
  - `title` (text) - Lesson title
  - `description` (text) - Detailed description
  - `thumbnail_url` (text) - Preview image
  - `video_url` (text) - Video content URL
  - `duration` (integer) - Duration in minutes
  - `level` (text) - beginner/intermediate/advanced
  - `technique` (text) - pencil/watercolor/digital/oil/etc
  - `category` (text) - portrait/landscape/animals/anime/etc
  - `materials` (text[]) - Required materials list
  - `teacher_id` (uuid) - Foreign key to teachers
  - `views` (integer) - View count
  - `rating` (numeric) - Average rating
  - `created_at` (timestamptz)

  ### user_progress
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `lesson_id` (uuid) - Foreign key to lessons
  - `completed` (boolean) - Completion status
  - `progress_percent` (integer) - Progress percentage
  - `last_watched_at` (timestamptz)
  - `created_at` (timestamptz)

  ### favorites
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `lesson_id` (uuid) - Foreign key to lessons
  - `created_at` (timestamptz)

  ### lesson_ratings
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `lesson_id` (uuid) - Foreign key to lessons
  - `rating` (integer) - Rating value 1-5
  - `created_at` (timestamptz)

  ### comments
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `lesson_id` (uuid) - Foreign key to lessons
  - `content` (text) - Comment text
  - `created_at` (timestamptz)

  ### user_artworks
  - `id` (uuid, primary key)
  - `user_id` (uuid) - Foreign key to auth.users
  - `lesson_id` (uuid, optional) - Related lesson
  - `title` (text) - Artwork title
  - `image_url` (text) - Artwork image
  - `description` (text) - Description
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for lessons and teachers
  - Authenticated users can manage their own data
*/

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text NOT NULL,
  avatar_url text NOT NULL,
  specialization text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view teachers"
  ON teachers FOR SELECT
  TO public
  USING (true);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text NOT NULL,
  video_url text,
  duration integer NOT NULL DEFAULT 0,
  level text NOT NULL CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  technique text NOT NULL,
  category text NOT NULL,
  materials text[] DEFAULT '{}',
  teacher_id uuid REFERENCES teachers(id) ON DELETE SET NULL,
  views integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lessons"
  ON lessons FOR SELECT
  TO public
  USING (true);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  completed boolean DEFAULT false,
  progress_percent integer DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  last_watched_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Lesson ratings table
CREATE TABLE IF NOT EXISTS lesson_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE lesson_ratings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ratings"
  ON lesson_ratings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert ratings"
  ON lesson_ratings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ratings"
  ON lesson_ratings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view comments"
  ON comments FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- User artworks table
CREATE TABLE IF NOT EXISTS user_artworks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id uuid REFERENCES lessons(id) ON DELETE SET NULL,
  title text NOT NULL,
  image_url text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_artworks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view artworks"
  ON user_artworks FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert artworks"
  ON user_artworks FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own artworks"
  ON user_artworks FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own artworks"
  ON user_artworks FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_lessons_teacher ON lessons(teacher_id);
CREATE INDEX IF NOT EXISTS idx_lessons_level ON lessons(level);
CREATE INDEX IF NOT EXISTS idx_lessons_technique ON lessons(technique);
CREATE INDEX IF NOT EXISTS idx_lessons_category ON lessons(category);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_lesson ON user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_lesson ON comments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_artworks_user ON user_artworks(user_id);
