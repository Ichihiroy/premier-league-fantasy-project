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
            <div className="flex items-center bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
              LIVE
            </div>
            {match.minute && (
              <span className="text-accent-teal font-bold text-sm">{match.minute}'</span>
            )}
          </div>
        );
      case 'ft':
        return (
          <div className="bg-neutral-600 text-white px-2 py-1 rounded-full text-xs font-bold">
            FT
          </div>
        );
      case 'scheduled':
        return (
          <div className="text-right">
            <div className="text-white font-semibold text-sm">{match.time}</div>
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
          <div className="text-2xl font-bold text-neutral-400">VS</div>
        </div>
      );
    }
    
    return (
      <div className="text-center bg-gradient-to-br from-accent-magenta to-accent-teal rounded-xl px-4 py-2 border border-white/20">
        <div className="text-2xl font-bold text-white">
          {match.homeScore ?? 0} - {match.awayScore ?? 0}
        </div>
      </div>
    );
  };

  const TeamLogo: React.FC<{ team: Team }> = ({ team }) => (
    <div className="flex flex-col items-center space-y-2 flex-1">
      <div className="w-12 h-12 bg-gradient-to-br from-accent-magenta to-accent-teal rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white/20">
        {team.logo ? (
          <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain" />
        ) : (
          <span className="text-sm">{team.shortName.slice(0, 3).toUpperCase()}</span>
        )}
      </div>
      <div className="text-center">
        <div className="font-semibold text-white text-sm">{team.shortName}</div>
        <div className="text-xs text-neutral-300 hidden sm:block truncate max-w-20">{team.name}</div>
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
      className={`card relative cursor-pointer group transition-all duration-300 hover:scale-105 hover:shadow-2xl ${sizeClasses[size]} ${className}`}
      onClick={() => onClick?.(match)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(match);
        }
      }}
    >
      {/* Header with Competition and Status */}
      <div className="flex justify-between items-start mb-4">
        {/* Competition Badge */}
        <div>
          {match.competition && (
            <span className="text-xs text-accent-teal bg-accent-teal/20 px-2 py-1 rounded-full border border-accent-teal/30">
              {match.competition}
            </span>
          )}
        </div>

        {/* Status */}
        <div className="text-right">
          {getStatusDisplay()}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between">
        {/* Home Team */}
        <TeamLogo team={match.homeTeam} />

        {/* Score/Time */}
        <div className="flex-shrink-0 mx-4">
          {getScoreDisplay()}
        </div>

        {/* Away Team */}
        <TeamLogo team={match.awayTeam} />
      </div>

      {/* Venue */}
      {match.venue && (
        <div className="mt-4 pt-3 border-t border-white/10">
          <div className="text-xs text-neutral-400 flex items-center justify-center space-x-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{match.venue}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchCard;