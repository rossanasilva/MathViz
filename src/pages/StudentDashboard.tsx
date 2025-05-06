import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Star, Activity, GraduationCap, Calculator, Brain } from 'lucide-react';
import Leaderboard from '../components/Leaderboard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface Section {
  title: string;
  description: string;
  items: {
    title: string;
    description: string;
    icon: React.ComponentType;
    color: string;
    link: string;
  }[];
}

interface StudentDashboardProps {
  sections: Section[];
}

export default function StudentDashboard({ sections }: StudentDashboardProps) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<{ xp: number; username: string } | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('xp, username')
      .eq('id', user?.id)
      .single();

    if (!error && data) {
      setUserProfile(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Visualizações Interativas para Matemática
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Aprenda matemática de forma interativa e divertida com visualizações, 
              exercícios práticos e quizzes para testar seu conhecimento.
            </p>
            {userProfile && (
              <div className="mt-8 inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-xl font-bold">{userProfile.xp} XP</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              <p className="text-gray-600 mt-1">{section.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  to={item.link}
                  className="block group"
                >
                  <div className={`h-full rounded-xl shadow-sm overflow-hidden bg-gradient-to-br ${item.color} p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-white/10 rounded-lg">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-white/90">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Progress Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Seu Progresso</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-600">XP Total</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">1,250</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-orange-500" />
                <span className="text-gray-600">Ranking</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">#12</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">Lições Completadas</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">8/12</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Nível</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-2">5</p>
            </div>
          </div>
        </div>

        {/* Add Leaderboard Section */}
        <div className="mt-16">
          <Leaderboard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Visualizações Interativas para o Ensino da Matemática
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}