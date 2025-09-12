import React, { useState } from 'react';
import MatchCard from '../components/ui/MatchCard';
import LiveTicker from '../components/ui/LiveTicker';

interface FixturesPageProps {}

const FixturesPage: React.FC<FixturesPageProps> = () => {
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedCompetition, setSelectedCompetition] = useState('all');

  const fixtures = [
    {
      id: '1',
      homeTeam: { name: 'Arsenal', shortName: 'ARS' },
      awayTeam: { name: 'Chelsea', shortName: 'CHE' },
      homeScore: 2,
      awayScore: 1,
      status: 'live' as const,
      minute: 67,
      venue: 'Emirates Stadium',
      competition: 'Premier League',
      date: 'Today',
      time: '15:00'
    },
    {
      id: '2',
      homeTeam: { name: 'Manchester City', shortName: 'MCI' },
      awayTeam: { name: 'Liverpool', shortName: 'LIV' },
      status: 'scheduled' as const,
      time: '17:30',
      date: 'Today',
      venue: 'Etihad Stadium',
      competition: 'Premier League'
    },
    {
      id: '3',
      homeTeam: { name: 'Newcastle United', shortName: 'NEW' },
      awayTeam: { name: 'Tottenham Hotspur', shortName: 'TOT' },
      homeScore: 1,
      awayScore: 2,
      status: 'ft' as const,
      venue: 'St. James\' Park',
      competition: 'Premier League',
      date: 'Today',
      time: '12:30'
    },
    {
      id: '4',
      homeTeam: { name: 'Brighton & Hove Albion', shortName: 'BHA' },
      awayTeam: { name: 'West Ham United', shortName: 'WHU' },
      status: 'scheduled' as const,
      time: '14:00',
      date: 'Tomorrow',
      venue: 'Amex Stadium',
      competition: 'Premier League'
    },
    {
      id: '5',
      homeTeam: { name: 'Aston Villa', shortName: 'AVL' },
      awayTeam: { name: 'Everton', shortName: 'EVE' },
      status: 'scheduled' as const,
      time: '16:30',
      date: 'Tomorrow',
      venue: 'Villa Park',
      competition: 'Premier League'
    },
    {
      id: '6',
      homeTeam: { name: 'Manchester United', shortName: 'MUN' },
      awayTeam: { name: 'Wolverhampton Wanderers', shortName: 'WOL' },
      status: 'scheduled' as const,
      time: '19:00',
      date: 'Tomorrow',
      venue: 'Old Trafford',
      competition: 'Premier League'
    }
  ];

  const dateFilters = [
    { key: 'yesterday', label: 'Yesterday' },
    { key: 'today', label: 'Today' },
    { key: 'tomorrow', label: 'Tomorrow' },
    { key: 'week', label: 'This Week' }
  ];

  const competitionFilters = [
    { key: 'all', label: 'All Competitions' },
    { key: 'premier-league', label: 'Premier League' },
    { key: 'champions-league', label: 'Champions League' },
    { key: 'fa-cup', label: 'FA Cup' },
    { key: 'carabao-cup', label: 'Carabao Cup' }
  ];

  const filteredFixtures = fixtures.filter(fixture => {
    const dateMatch = selectedDate === 'all' || 
      (selectedDate === 'today' && fixture.date === 'Today') ||
      (selectedDate === 'tomorrow' && fixture.date === 'Tomorrow') ||
      (selectedDate === 'yesterday' && fixture.date === 'Yesterday') ||
      (selectedDate === 'week');
    
    const competitionMatch = selectedCompetition === 'all' || 
      fixture.competition.toLowerCase().replace(/\s+/g, '-') === selectedCompetition;
    
    return dateMatch && competitionMatch;
  });

  const groupedFixtures = filteredFixtures.reduce((groups, fixture) => {
    const date = fixture.date || 'Unknown';
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(fixture);
    return groups;
  }, {} as Record<string, typeof fixtures>);

  const handleMatchClick = (match: any) => {
    console.log('Match clicked:', match.id);
  };

  return (
    <div className="min-h-screen bg-gradient-primary pt-6">
      {/* Live Ticker */}
      <LiveTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-display text-white font-bold fade-up">Fixtures & Results</h1>
          <p className="text-body-lg text-neutral-300 mt-2 fade-up fade-up-delay-1">
            Live scores, upcoming matches, and recent results
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Date Filter */}
          <div className="card fade-up fade-up-delay-2">
            <h3 className="text-lg font-semibold text-white mb-4">Filter by Date</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {dateFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedDate(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDate === filter.key
                      ? 'bg-gradient-accent text-white shadow-glow-accent'
                      : 'bg-neutral-800 bg-opacity-50 text-neutral-300 hover:text-white hover:bg-opacity-70'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Competition Filter */}
          <div className="card fade-up fade-up-delay-3">
            <h3 className="text-lg font-semibold text-white mb-4">Filter by Competition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {competitionFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedCompetition(filter.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCompetition === filter.key
                      ? 'bg-gradient-accent text-white shadow-glow-accent'
                      : 'bg-neutral-800 bg-opacity-50 text-neutral-300 hover:text-white hover:bg-opacity-70'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-8">
          {Object.entries(groupedFixtures).map(([date, matches], groupIndex) => (
            <div key={date} className={`fade-up fade-up-delay-${groupIndex + 1}`}>
              <div className="flex items-center mb-6">
                <h2 className="text-h2 text-white font-bold">{date}</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-neutral-700 to-transparent ml-6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {matches.map((match, index) => (
                  <div key={match.id} className={`fade-up fade-up-delay-${index + 1}`}>
                    <MatchCard match={match} onClick={handleMatchClick} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFixtures.length === 0 && (
          <div className="text-center py-16 fade-up">
            <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
            <p className="text-neutral-400">Try adjusting your filters to see more fixtures.</p>
            <button 
              onClick={() => {
                setSelectedDate('today');
                setSelectedCompetition('all');
              }}
              className="btn-secondary mt-4"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="card text-center fade-up">
            <div className="text-3xl font-bold text-gradient mb-2">
              {fixtures.filter(f => f.status === 'live').length}
            </div>
            <div className="text-neutral-300">Live Matches</div>
          </div>
          <div className="card text-center fade-up fade-up-delay-1">
            <div className="text-3xl font-bold text-gradient mb-2">
              {fixtures.filter(f => f.status === 'scheduled').length}
            </div>
            <div className="text-neutral-300">Upcoming Today</div>
          </div>
          <div className="card text-center fade-up fade-up-delay-2">
            <div className="text-3xl font-bold text-gradient mb-2">
              {fixtures.filter(f => f.status === 'ft').length}
            </div>
            <div className="text-neutral-300">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FixturesPage;