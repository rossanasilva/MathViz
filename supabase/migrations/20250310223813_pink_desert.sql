/*
  # Database Schema Setup

  1. Tables
    - profiles: User profile information
    - resources: Educational resources
    - progress: Student progress tracking
  
  2. Security
    - Row Level Security (RLS) enabled on all tables
    - Granular policies for data access
    - Role-based permissions
*/

-- Create profiles table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
    CREATE TYPE user_role AS ENUM ('student', 'teacher');
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    CREATE TABLE profiles (
      id uuid PRIMARY KEY REFERENCES auth.users,
      username text UNIQUE NOT NULL,
      is_teacher boolean DEFAULT false,
      xp integer DEFAULT 0,
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create resources table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'resources') THEN
    CREATE TABLE resources (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      title text NOT NULL,
      content text NOT NULL,
      topic text NOT NULL,
      created_by uuid REFERENCES profiles(id),
      created_at timestamptz DEFAULT now()
    );
  END IF;
END $$;

-- Create progress table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'progress') THEN
    CREATE TABLE progress (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES profiles(id),
      resource_id uuid REFERENCES resources(id),
      completed boolean DEFAULT false,
      xp_earned integer DEFAULT 0,
      completed_at timestamptz,
      UNIQUE(user_id, resource_id)
    );
  END IF;
END $$;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "resources_select_all" ON resources;
DROP POLICY IF EXISTS "resources_insert_teachers" ON resources;
DROP POLICY IF EXISTS "progress_select_own" ON progress;
DROP POLICY IF EXISTS "progress_insert_own" ON progress;
DROP POLICY IF EXISTS "progress_update_own" ON progress;

-- Profiles policies
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Resources policies
CREATE POLICY "resources_select_all"
  ON resources FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "resources_insert_teachers"
  ON resources FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_teacher = true
    )
  );

-- Progress policies
CREATE POLICY "progress_select_own"
  ON progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "progress_insert_own"
  ON progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "progress_update_own"
  ON progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());