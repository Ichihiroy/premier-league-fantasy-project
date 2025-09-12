import React from 'react';

interface TeamStanding {
  position: number;
  team: {
    name: string;
    shortName: string;
    logo?: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  lastPosition?: number;
}

interface StandingsTableProps {
  standings: TeamStanding[];
  className?: string;
  showForm?: boolean;
}

const StandingsTable: React.FC<StandingsTableProps> = ({
  standings,
  className = '',
  showForm = true
}) => {
  const getPositionChange = (current: number, last?: number) => {
    if (!last) return null;
    
    const change = last - current;
    if (change > 0) {
      return (
        <div className="flex items-center text-semantic-success text-xs">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {change}
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-semantic-error text-xs">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {Math.abs(change)}
        </div>
      );
    }
    
    return (
      <div className="text-neutral-400 text-xs">
        <div className="w-3 h-3 rounded-full bg-neutral-600"></div>
      </div>
    );
  };

  const getPositionColor = (position: number) => {
    if (position <= 4) return 'border-l-semantic-success bg-semantic-success bg-opacity-10';
    if (position <= 6) return 'border-l-accent-teal bg-accent-teal bg-opacity-10';
    if (position >= 18) return 'border-l-semantic-error bg-semantic-error bg-opacity-10';
    return 'border-l-transparent';
  };

  const getFormIcon = (result: 'W' | 'D' | 'L') => {
    const baseClasses = "w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold";
    
    switch (result) {
      case 'W':
        return (
          <div className={`${baseClasses} bg-semantic-success text-white`}>
            W
          </div>
        );
      case 'D':
        return (
          <div className={`${baseClasses} bg-semantic-warning text-neutral-900`}>
            D
          </div>
        );
      case 'L':
        return (
          <div className={`${baseClasses} bg-semantic-error text-white`}>
            L
          </div>
        );
    }
  };

  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-neutral-700">
        <h2 className="text-h3 text-white font-bold">League Table</h2>
        <p className="text-sm text-neutral-300 mt-1">2024/25 Premier League</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-800">
            <tr>
              <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Pos
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Club
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Pl
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                W
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                D
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                L
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                GF
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                GA
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                GD
              </th>
              <th className="text-center py-3 px-2 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Pts
              </th>
              {showForm && (
                <th className="text-center py-3 px-4 text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                  Form
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {standings.map((team) => (
              <tr 
                key={team.team.name}
                className={`border-b border-neutral-800 hover:bg-neutral-800 hover:bg-opacity-50 transition-colors ${getPositionColor(team.position)} border-l-4`}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white w-6 text-center">
                      {team.position}
                    </span>
                    {getPositionChange(team.position, team.lastPosition)}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-accent rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {team.team.logo ? (
                        <img src={team.team.logo} alt={team.team.name} className="w-5 h-5 object-contain" />
                      ) : (
                        team.team.shortName.slice(0, 3).toUpperCase()
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">
                        {team.team.shortName}
                      </div>
                      <div className="text-xs text-neutral-400 hidden lg:block">
                        {team.team.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-center text-sm text-neutral-300">
                  {team.played}
                </td>
                <td className="py-3 px-2 text-center text-sm text-semantic-success font-semibold">
                  {team.won}
                </td>
                <td className="py-3 px-2 text-center text-sm text-semantic-warning font-semibold">
                  {team.drawn}
                </td>
                <td className="py-3 px-2 text-center text-sm text-semantic-error font-semibold">
                  {team.lost}
                </td>
                <td className="py-3 px-2 text-center text-sm text-neutral-300">
                  {team.goalsFor}
                </td>
                <td className="py-3 px-2 text-center text-sm text-neutral-300">
                  {team.goalsAgainst}
                </td>
                <td className={`py-3 px-2 text-center text-sm font-semibold ${
                  team.goalDifference > 0 ? 'text-semantic-success' : 
                  team.goalDifference < 0 ? 'text-semantic-error' : 'text-neutral-300'
                }`}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </td>
                <td className="py-3 px-2 text-center text-lg font-bold text-white">
                  {team.points}
                </td>
                {showForm && (
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center space-x-1">
                      {team.form.slice(-5).map((result, idx) => (
                        <div key={idx}>
                          {getFormIcon(result)}
                        </div>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 bg-neutral-900 border-t border-neutral-700">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-semantic-success rounded"></div>
            <span className="text-neutral-300">Champions League</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent-teal rounded"></div>
            <span className="text-neutral-300">Europa League</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-semantic-error rounded"></div>
            <span className="text-neutral-300">Relegation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandingsTable;