/*
  # Fix authentication schema

  1. Changes
    - Recreate test users with proper schema
    - Handle foreign key constraints correctly
    - Set up user profiles
*/

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Recreate test users with proper schema
DO $$
BEGIN
  -- First delete profiles to handle foreign key constraints
  DELETE FROM profiles WHERE username IN ('admin', 'aluno');
  
  -- Then delete users
  DELETE FROM auth.users WHERE email IN ('admin@example.com', 'aluno@example.com');
  
  -- Create admin user
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000000',
    'admin@example.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
    jsonb_build_object(),
    'authenticated',
    'authenticated'
  );

  -- Create student user
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    uuid_generate_v4(),
    '00000000-0000-0000-0000-000000000000',
    'aluno@example.com',
    crypt('aluno123', gen_salt('bf')),
    now(),
    now(),
    now(),
    jsonb_build_object('provider', 'email', 'providers', ARRAY['email']),
    jsonb_build_object(),
    'authenticated',
    'authenticated'
  );
END $$;

-- Create profiles for test users
DO $$
DECLARE
  admin_id uuid;
  student_id uuid;
BEGIN
  -- Get user IDs
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@example.com';
  SELECT id INTO student_id FROM auth.users WHERE email = 'aluno@example.com';

  -- Create profiles
  INSERT INTO profiles (id, username, is_teacher)
  VALUES 
    (admin_id, 'admin', true),
    (student_id, 'aluno', false)
  ON CONFLICT (id) DO UPDATE 
  SET 
    username = EXCLUDED.username,
    is_teacher = EXCLUDED.is_teacher;
END $$;