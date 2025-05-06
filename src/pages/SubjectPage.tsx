import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Quiz from '../components/Quiz';
import InteractiveCalculator from '../components/InteractiveCalculator';
import GraphVisualizer from '../components/GraphVisualizer';
import InteractiveRuler from '../components/InteractiveRuler';
import InteractiveGeometry from '../components/InteractiveGeometry';
import { BookOpen, Calculator, Brain, ChevronRight, ArrowLeft, Home, Ruler, Hexagon } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  xpReward: number;
}

interface Activity {
  title: string;
  content: string;
  hasCalculator?: boolean;
  hasGraph?: boolean;
  hasRuler?: boolean;
  hasGeometry?: boolean;
  quiz?: {
    questions: Question[];
  };
}

interface Topic {
  title: string;
  content: string;
  path: string;
  activities?: Activity[];
}

interface SubjectContent {
  title: string;
  description: string;
  topics: Topic[];
}

export default function SubjectPage() {
  const { grade, subject } = useParams<{ grade: string; subject: string }>();

  // Get the content from App.tsx grades array
  const gradeContent = window.grades?.find(g => g.year.toString() === grade);
  const topicContent = gradeContent?.topics.find(t => t.path === subject);

  if (!topicContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Conteúdo não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              to={`/grade/${grade}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span>Início</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-2">{topicContent.title}</h1>
          <p className="text-blue-100">{topicContent.content}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {topicContent.activities?.map((activity, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-semibold">{activity.title}</h2>
                </div>

                <p className="text-gray-600 mb-6">{activity.content}</p>

                {activity.hasCalculator && (
                  <div className="mb-6">
                    <InteractiveCalculator />
                  </div>
                )}

                {activity.hasGraph && (
                  <div className="mb-6">
                    <GraphVisualizer />
                  </div>
                )}

                {activity.hasRuler && (
                  <div className="mb-6">
                    <InteractiveRuler />
                  </div>
                )}

                {activity.hasGeometry && (
                  <div className="mb-6">
                    <InteractiveGeometry />
                  </div>
                )}

                {activity.quiz && (
                  <div className="mt-6">
                    <Quiz
                      topic={activity.title}
                      questions={activity.quiz.questions}
                      onComplete={(score) => {
                        console.log(`Quiz completed with score: ${score}`);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}