import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isTeacher: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'teacher'
  },
  {
    id: '2',
    email: 'aluno@example.com',
    password: 'aluno123',
    role: 'student'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      if (!mockUser) throw new Error('Invalid credentials');

      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signOut,
      isTeacher: user?.role === 'teacher'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}