import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, GraduationCap, BookOpen, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const location = useLocation();
  const { user, isTeacher } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
            <img
                src="/src/logo.png"
                alt="MathViz Logo"
                className="h-14 w-100"
              />
              {/* <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">MathViz</span> */}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5 mr-1" />
              <span>Início</span>
            </Link>

            {isTeacher ? (
              <Link
                to="/teacher"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/teacher'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <GraduationCap className="w-5 h-5 mr-1" />
                <span>Área do Professor</span>
              </Link>
            ) : (
              <Link
                to="/student"
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/student'
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5 mr-1" />
                <span>Meu Progresso</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}