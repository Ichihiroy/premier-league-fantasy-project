import React from 'react';

interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'live' | 'ft' | 'scheduled';
  minute?: number;
  time?: string;
}

interface LiveTickerProps {
  matches?: MatchData[];
  className?: string;
}

const defaultMatches: MatchData[] = [
  { id: '1', homeTeam: 'Arsenal', awayTeam: 'Chelsea', homeScore: 2, awayScore: 1, status: 'live', minute: 67 },
  { id: '2', homeTeam: 'Man City', awayTeam: 'Liverpool', homeScore: 1, awayScore: 3, status: 'ft' },
  { id: '3', homeTeam: 'Newcastle', awayTeam: 'Tottenham', status: 'scheduled', time: '15:00' },
  { id: '4', homeTeam: 'Brighton', awayTeam: 'West Ham', homeScore: 0, awayScore: 0, status: 'live', minute: 23 },
  { id: '5', homeTeam: 'Aston Villa', awayTeam: 'Everton', homeScore: 2, awayScore: 0, status: 'ft' },
];

const LiveTicker: React.FC<LiveTickerProps> = ({ 
  matches = defaultMatches,
  className = '' 
}) => {
  const getStatusPill = (match: MatchData) => {
    switch (match.status) {
      case 'live':
        return (
          <span className="status-live flex items-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>{match.minute}'</span>
          </span>
        );
      case 'ft':
        return <span className="status-ft">FT</span>;
      case 'scheduled':
        return <span className="status-scheduled">{match.time}</span>;
      default:
        return null;
    }
  };

  const formatScore = (match: MatchData) => {
    if (match.status === 'scheduled') {
      return 'vs';
    }
    return `${match.homeScore ?? 0} - ${match.awayScore ?? 0}`;
  };

  return (
    <div className={`relative overflow-hidden bg-neutral-800 border-y border-neutral-700 py-3 ${className}`}>
      <div className="ticker">
        {matches.concat(matches).map((match, index) => (
          <div 
            key={`${match.id}-${index}`}
            className="flex items-center space-x-4 whitespace-nowrap px-6"
          >
            <div className="flex items-center space-x-3">
              {getStatusPill(match)}
              
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium text-white">{match.homeTeam}</span>
                <span className="text-neutral-400 font-mono font-bold">
                  {formatScore(match)}
                </span>
                <span className="font-medium text-white">{match.awayTeam}</span>
              </div>
            </div>
            
            {/* Separator */}
            <div className="w-px h-4 bg-neutral-600"></div>
          </div>
        ))}
      </div>
      
      {/* Gradient Edges */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-neutral-800 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-neutral-800 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default LiveTicker;