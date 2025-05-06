/*
  # Create Test Users

  1. Changes
    - Create initial test users (admin and student)
    - Set up authentication for test accounts
    
  2. Security
    - Passwords are hashed by Supabase Auth
    - Users are created with appropriate roles
*/

-- Create admin user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@example.com'
  ) THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@example.com',
      crypt('admin123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- Create student user if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'aluno@example.com'
  ) THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at
    )
    VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'aluno@example.com',
      crypt('aluno123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW()
    );
  END IF;
END $$;

-- Create profiles for test users if they don't exist
DO $$
DECLARE
  admin_id uuid;
  student_id uuid;
BEGIN
  -- Get admin user ID
  SELECT id INTO admin_id FROM auth.users WHERE email = 'admin@example.com';
  
  -- Get student user ID
  SELECT id INTO student_id FROM auth.users WHERE email = 'aluno@example.com';

  -- Create admin profile
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = admin_id) THEN
    INSERT INTO profiles (id, username, is_teacher, xp)
    VALUES (admin_id, 'admin', true, 0);
  END IF;

  -- Create student profile
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = student_id) THEN
    INSERT INTO profiles (id, username, is_teacher, xp)
    VALUES (student_id, 'aluno', false, 0);
  END IF;
END $$;