import React, { useState } from 'react';
import { Brain, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  xpReward: number;
}

interface QuizProps {
  topic: string;
  questions: Question[];
  onComplete: (score: number) => void;
}

export default function Quiz({ topic, questions, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      const xpEarned = questions[currentQuestion].xpReward;
      setScore(prev => prev + 1);
      setTotalXP(prev => prev + xpEarned);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
        onComplete(score);
      }
    }, 1000);
  };

  if (completed) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">Quiz Completo!</h2>
        <p className="text-lg mb-2">Sua pontuação: {score}/{questions.length}</p>
        <p className="text-green-500 text-xl font-bold">+{totalXP} XP</p>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold">{topic}</h2>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-2">
          Questão {currentQuestion + 1} de {questions.length}
        </div>
        <p className="text-lg font-medium">{question.question}</p>
        <p className="text-sm text-green-500 mt-1">
          Recompensa: {question.xpReward} XP
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={selectedAnswer !== null}
            className={`w-full p-4 text-left rounded-lg transition-colors ${
              selectedAnswer === null
                ? 'hover:bg-gray-100'
                : selectedAnswer === index
                ? index === question.correctAnswer
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : index === question.correctAnswer
                ? 'bg-green-100 border-green-500'
                : 'bg-gray-50'
            } ${
              selectedAnswer !== null ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}