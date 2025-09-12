import React from 'react';

interface Team {
  name: string;
  logo?: string;
  shortName: string;
}

interface MatchCardData {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'ft' | 'scheduled';
  minute?: number;
  time?: string;
  date?: string;
  venue?: string;
  competition?: string;
}

interface MatchCardProps {
  match: MatchCardData;
  onClick?: (match: MatchCardData) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MatchCard: React.FC<MatchCardProps> = ({ 
  match, 
  onClick,
  className = '',
  size = 'md' 
}) => {
  const getStatusDisplay = () => {
    switch (match.status) {
      case 'live':
        return (
          <div className="flex items-center space-x-2">
            <div className="status-live">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
              LIVE
            </div>
            {match.minute && (
              <span className="text-accent-teal font-bold text-sm">{match.minute}'</span>
            )}
          </div>
        );
      case 'ft':
        return <div className="status-ft">FULL TIME</div>;
      case 'scheduled':
        return (
          <div className="text-center">
            <div className="status-scheduled mb-1">{match.time}</div>
            {match.date && (
              <div className="text-xs text-neutral-400">{match.date}</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getScoreDisplay = () => {
    if (match.status === 'scheduled') {
      return (
        <div className="text-center">
          <div className="text-2xl font-bold text-neutral-400">vs</div>
        </div>
      );
    }
    
    return (
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1">
          {match.homeScore ?? 0} - {match.awayScore ?? 0}
        </div>
      </div>
    );
  };

  const TeamLogo: React.FC<{ team: Team; isHome: boolean }> = ({ team, isHome }) => (
    <div className={`flex ${isHome ? 'flex-col' : 'flex-col-reverse'} items-center space-y-2 flex-1`}>
      <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center text-white font-bold text-lg shadow-glow">
        {team.logo ? (
          <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain" />
        ) : (
          team.shortName.slice(0, 3).toUpperCase()
        )}
      </div>
      <div className="text-center">
        <div className="font-semibold text-white text-sm">{team.shortName}</div>
        <div className="text-xs text-neutral-300 hidden sm:block">{team.name}</div>
      </div>
    </div>
  );

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  return (
    <div 
      className={`match-card cursor-pointer group ${sizeClasses[size]} ${className}`}
      onClick={() => onClick?.(match)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(match);
        }
      }}
    >
      {/* Competition Badge */}
      {match.competition && (
        <div className="absolute top-2 left-2">
          <span className="text-caption text-accent-teal bg-accent-teal bg-opacity-20 px-2 py-1 rounded">
            {match.competition}
          </span>
        </div>
      )}

      {/* Status */}
      <div className="absolute top-2 right-2">
        {getStatusDisplay()}
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between mt-6">
        {/* Home Team */}
        <TeamLogo team={match.homeTeam} isHome={true} />

        {/* Score/Time */}
        <div className="flex-shrink-0 mx-4">
          {getScoreDisplay()}
        </div>

        {/* Away Team */}
        <TeamLogo team={match.awayTeam} isHome={false} />
      </div>

      {/* Venue */}
      {match.venue && (
        <div className="mt-4 text-center">
          <div className="text-xs text-neutral-400 flex items-center justify-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{match.venue}</span>
          </div>
        </div>
      )}

      {/* Hover Effect Indicator */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-teal rounded-xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  );
};

export default MatchCard;