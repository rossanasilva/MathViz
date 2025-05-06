import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { username: 'João Silva', xp: 250, rank: 1 },
  { username: 'Maria Santos', xp: 200, rank: 2 },
  { username: 'Pedro Oliveira', xp: 180, rank: 3 },
  { username: 'Ana Costa', xp: 150, rank: 4 },
  { username: 'Lucas Souza', xp: 120, rank: 5 }
];

export default function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-700" />;
      default:
        return <Star className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-500" />
        Ranking
      </h2>

      <div className="space-y-4">
        {MOCK_LEADERBOARD.map((entry) => (
          <div
            key={entry.username}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8">
                {getRankIcon(entry.rank)}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{entry.username}</p>
                <p className="text-sm text-gray-500">Rank #{entry.rank}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-700">{entry.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}