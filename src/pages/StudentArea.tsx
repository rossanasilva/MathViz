import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Star, Trophy, BookOpen, Activity, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_PROGRESS = {
  totalXP: 150,
  completedResources: 3,
  currentLevel: 2,
  ranking: 5,
  recentActivities: [
    {
      id: '1',
      title: 'Probabilidade Básica',
      topic: 'Probabilidade e Estatística',
      completedAt: '2025-03-15T10:30:00Z',
      xpEarned: 50
    },
    {
      id: '2',
      title: 'Orçamento Pessoal',
      topic: 'Educação Financeira',
      completedAt: '2025-03-14T15:45:00Z',
      xpEarned: 40
    }
  ]
};

export default function StudentArea() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Meu Progresso</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Sair</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">XP Total</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PROGRESS.totalXP}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ranking</p>
                <p className="text-2xl font-bold text-gray-900">#{MOCK_PROGRESS.ranking}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Atividades Completas</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PROGRESS.completedResources}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Nível</p>
                <p className="text-2xl font-bold text-gray-900">{MOCK_PROGRESS.currentLevel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Atividades Recentes</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {MOCK_PROGRESS.recentActivities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.topic}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(activity.completedAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">+{activity.xpEarned} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}