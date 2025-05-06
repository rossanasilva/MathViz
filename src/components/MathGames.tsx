import React, { useState, useEffect } from 'react';
import { TowerControl as GameController, Timer, Trophy, RefreshCw } from 'lucide-react';

interface GameProps {
  type: 'arithmetic' | 'sequence' | 'geometry';
  difficulty?: 'easy' | 'medium' | 'hard';
  onScore?: (score: number) => void;
}

export default function MathGames({ type, difficulty = 'easy', onScore }: GameProps) {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const generateArithmeticProblem = () => {
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2;

    switch (difficulty) {
      case 'easy':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        break;
      case 'medium':
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        break;
      case 'hard':
        num1 = Math.floor(Math.random() * 100) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        break;
    }

    let answer;
    switch (operation) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '*': answer = num1 * num2; break;
    }

    return {
      question: `${num1} ${operation} ${num2} = ?`,
      answer: answer
    };
  };

  const generateSequenceProblem = () => {
    const sequences = {
      easy: [
        { pattern: 'n + 2', length: 4 },
        { pattern: 'n * 2', length: 4 }
      ],
      medium: [
        { pattern: 'n * 3', length: 4 },
        { pattern: 'n * n', length: 4 }
      ],
      hard: [
        { pattern: 'n * n + 1', length: 4 },
        { pattern: 'fibonacci', length: 4 }
      ]
    };

    const sequence = sequences[difficulty][Math.floor(Math.random() * sequences[difficulty].length)];
    let numbers = [];
    let answer;

    if (sequence.pattern === 'fibonacci') {
      numbers = [1, 1];
      for (let i = 2; i < sequence.length; i++) {
        numbers.push(numbers[i-1] + numbers[i-2]);
      }
      answer = numbers[sequence.length-1] + numbers[sequence.length-2];
    } else {
      for (let i = 1; i <= sequence.length; i++) {
        let num;
        switch (sequence.pattern) {
          case 'n + 2': num = i + 2; break;
          case 'n * 2': num = i * 2; break;
          case 'n * 3': num = i * 3; break;
          case 'n * n': num = i * i; break;
          case 'n * n + 1': num = i * i + 1; break;
        }
        numbers.push(num);
      }
      answer = eval(sequence.pattern.replace('n', (sequence.length + 1).toString()));
    }

    return {
      question: `Qual é o próximo número na sequência: ${numbers.join(', ')}, ?`,
      answer: answer
    };
  };

  const generateGeometryProblem = () => {
    const shapes = {
      easy: [
        { type: 'square', side: Math.floor(Math.random() * 10) + 1 },
        { type: 'rectangle', width: Math.floor(Math.random() * 10) + 1, height: Math.floor(Math.random() * 10) + 1 }
      ],
      medium: [
        { type: 'triangle', base: Math.floor(Math.random() * 10) + 1, height: Math.floor(Math.random() * 10) + 1 },
        { type: 'circle', radius: Math.floor(Math.random() * 5) + 1 }
      ],
      hard: [
        { type: 'trapezoid', base1: Math.floor(Math.random() * 10) + 1, base2: Math.floor(Math.random() * 10) + 1, height: Math.floor(Math.random() * 5) + 1 },
        { type: 'parallelogram', base: Math.floor(Math.random() * 10) + 1, height: Math.floor(Math.random() * 5) + 1 }
      ]
    };

    const shape = shapes[difficulty][Math.floor(Math.random() * shapes[difficulty].length)];
    let question, answer;

    switch (shape.type) {
      case 'square':
        question = `Qual é a área de um quadrado com lado ${shape.side}?`;
        answer = shape.side * shape.side;
        break;
      case 'rectangle':
        question = `Qual é a área de um retângulo com largura ${shape.width} e altura ${shape.height}?`;
        answer = shape.width * shape.height;
        break;
      case 'triangle':
        question = `Qual é a área de um triângulo com base ${shape.base} e altura ${shape.height}?`;
        answer = (shape.base * shape.height) / 2;
        break;
      case 'circle':
        question = `Qual é a área de um círculo com raio ${shape.radius}? (Use π = 3.14)`;
        answer = Math.round(Math.PI * shape.radius * shape.radius * 100) / 100;
        break;
      case 'trapezoid':
        question = `Qual é a área de um trapézio com bases ${shape.base1} e ${shape.base2} e altura ${shape.height}?`;
        answer = ((shape.base1 + shape.base2) * shape.height) / 2;
        break;
      case 'parallelogram':
        question = `Qual é a área de um paralelogramo com base ${shape.base} e altura ${shape.height}?`;
        answer = shape.base * shape.height;
        break;
    }

    return { question, answer };
  };

  const generateProblem = () => {
    switch (type) {
      case 'arithmetic':
        return generateArithmeticProblem();
      case 'sequence':
        return generateSequenceProblem();
      case 'geometry':
        return generateGeometryProblem();
    }
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
    setCurrentProblem(generateProblem());
  };

  const checkAnswer = () => {
    const isCorrect = Math.abs(parseFloat(userAnswer) - currentProblem.answer) < 0.01;
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer('');
      setCurrentProblem(generateProblem());
    }, 1000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
      if (onScore) onScore(score);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  if (!gameActive) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <GameController className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Jogo de Matemática</h2>
        </div>

        {timeLeft === 0 ? (
          <div className="text-center mb-6">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <p className="text-2xl font-bold mb-2">Fim de Jogo!</p>
            <p className="text-lg">Sua pontuação: {score}</p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            Resolva o máximo de problemas que puder em 60 segundos!
          </p>
        )}

        <button
          onClick={startGame}
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
        >
          <GameController className="w-5 h-5" />
          {timeLeft === 0 ? 'Jogar Novamente' : 'Começar'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <GameController className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-semibold">Jogo de Matemática</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-gray-500" />
            <span className="font-mono">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span>{score}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-medium mb-4">{currentProblem.question}</p>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
          className={`w-full p-3 border rounded-lg ${
            feedback === 'correct'
              ? 'border-green-500 bg-green-50'
              : feedback === 'incorrect'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="Digite sua resposta..."
        />
      </div>

      <button
        onClick={checkAnswer}
        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Verificar
      </button>
    </div>
  );
}