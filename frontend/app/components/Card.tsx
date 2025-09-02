import { Link } from 'react-router';

interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  imageUrl?: string;
  stats?: {
    goals: number;
    assists: number;
  };
}

interface CardProps {
  player: Player;
  size?: 'small' | 'medium' | 'large';
}

export default function Card({ player, size = 'medium' }: CardProps) {
  const sizeClasses = {
    small: 'w-48',
    medium: 'w-64',
    large: 'w-80',
  };

  const imageSizeClasses = {
    small: 'h-48',
    medium: 'h-64',
    large: 'h-80',
  };

  return (
    <Link to={`/players/${player.id}`} className="block">
      <div
        className={`${sizeClasses[size]} bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
      >
        <div
          className={`${imageSizeClasses[size]} bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center`}
        >
          {player.imageUrl ? (
            <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-white text-6xl font-bold">
              {player.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-gray-900 mb-1">{player.name}</h3>
          <p className="text-gray-600 text-sm mb-2">
            {player.team} • {player.position}
          </p>

          {player.stats && (
            <div className="flex justify-between text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
              <span>Goals: {player.stats.goals}</span>
              <span>Assists: {player.stats.assists}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
