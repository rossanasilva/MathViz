/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `role` (text)
      - `xp` (integer)
      - `created_at` (timestamp)
    
    - `resources`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `topic` (text)
      - `year` (integer)
      - `created_by` (uuid, references users)
      - `created_at` (timestamp)
    
    - `progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `resource_id` (uuid, references resources)
      - `completed` (boolean)
      - `xp_earned` (integer)
      - `completed_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'student',
  xp integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  topic text NOT NULL,
  year integer NOT NULL,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Create progress table
CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  resource_id uuid REFERENCES resources(id),
  completed boolean DEFAULT false,
  xp_earned integer DEFAULT 0,
  completed_at timestamptz,
  UNIQUE(user_id, resource_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "allow_read_own_user_data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Resources policies
CREATE POLICY "allow_teacher_read_resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'teacher'
  ));

CREATE POLICY "allow_student_read_resources"
  ON resources
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_teacher_create_resources"
  ON resources
  FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'teacher'
  ));

-- Progress policies
CREATE POLICY "allow_read_own_progress"
  ON progress
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "allow_update_own_progress"
  ON progress
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "allow_insert_own_progress"
  ON progress
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());