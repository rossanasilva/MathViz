import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronRight } from 'lucide-react';

interface Topic {
  title: string;
  content: string;
  path: string;
}

interface Grade {
  year: number;
  icon: React.ComponentType;
  description: string;
  color: string;
  topics: Topic[];
}

interface GradePageProps {
  grades: Grade[];
}

function GradePage({ grades }: GradePageProps) {
  const { year } = useParams();
  const navigate = useNavigate();
  const grade = grades.find(g => g.year === Number(year));

  if (!grade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Ano não encontrado</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para a página inicial
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className={`w-full py-12 bg-gradient-to-r ${grade.color}`}>
        <div className="max-w-6xl mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="text-white opacity-80 hover:opacity-100 flex items-center gap-2 mb-6 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a página inicial
          </button>
          <div className="flex items-center gap-6">
            {React.createElement(grade.icon, { className: "w-16 h-16 text-white" } as any)}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {grade.year}º Ano
              </h1>
              <p className="text-xl text-white opacity-90">
                {grade.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {grade.topics.map((topic, index) => (
            <Link
              key={index}
              to={`/grade/${grade.year}/${topic.path}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                  <BookOpen className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {topic.content}
                  </p>
                  <div className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1 group">
                    Começar
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Visualizações Interativas para o Ensino da Matemática
          </p>
        </div>
      </footer>
    </div>
  );
}

export default GradePage;