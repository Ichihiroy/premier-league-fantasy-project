import React from 'react';
import Hero from '../components/ui/Hero';
import LiveTicker from '../components/ui/LiveTicker';
import MatchCard from '../components/ui/MatchCard';
import StandingsTable from '../components/ui/StandingsTable';
import NewsCard from '../components/ui/NewsCard';

// Sample data
const upcomingMatches = [
  {
    id: '1',
    homeTeam: { name: 'Arsenal', shortName: 'ARS' },
    awayTeam: { name: 'Chelsea', shortName: 'CHE' },
    homeScore: 2,
    awayScore: 1,
    status: 'live' as const,
    minute: 67,
    venue: 'Emirates Stadium',
    competition: 'Premier League'
  },
  {
    id: '2',
    homeTeam: { name: 'Manchester City', shortName: 'MCI' },
    awayTeam: { name: 'Liverpool', shortName: 'LIV' },
    status: 'scheduled' as const,
    time: '16:30',
    date: 'Tomorrow',
    venue: 'Etihad Stadium',
    competition: 'Premier League'
  },
  {
    id: '3',
    homeTeam: { name: 'Newcastle United', shortName: 'NEW' },
    awayTeam: { name: 'Tottenham', shortName: 'TOT' },
    homeScore: 1,
    awayScore: 2,
    status: 'ft' as const,
    venue: 'St. James\' Park',
    competition: 'Premier League'
  }
];

const standings = [
  {
    position: 1,
    team: { name: 'Arsenal', shortName: 'Arsenal' },
    played: 15,
    won: 12,
    drawn: 2,
    lost: 1,
    goalsFor: 35,
    goalsAgainst: 12,
    goalDifference: 23,
    points: 38,
    form: ['W', 'W', 'D', 'W', 'W'] as ('W' | 'D' | 'L')[],
    lastPosition: 2
  },
  {
    position: 2,
    team: { name: 'Manchester City', shortName: 'Man City' },
    played: 15,
    won: 11,
    drawn: 3,
    lost: 1,
    goalsFor: 40,
    goalsAgainst: 15,
    goalDifference: 25,
    points: 36,
    form: ['W', 'D', 'W', 'W', 'D'] as ('W' | 'D' | 'L')[],
    lastPosition: 1
  },
  {
    position: 3,
    team: { name: 'Liverpool', shortName: 'Liverpool' },
    played: 15,
    won: 10,
    drawn: 4,
    lost: 1,
    goalsFor: 32,
    goalsAgainst: 16,
    goalDifference: 16,
    points: 34,
    form: ['W', 'W', 'D', 'L', 'W'] as ('W' | 'D' | 'L')[],
    lastPosition: 3
  },
  {
    position: 4,
    team: { name: 'Chelsea', shortName: 'Chelsea' },
    played: 15,
    won: 9,
    drawn: 4,
    lost: 2,
    goalsFor: 28,
    goalsAgainst: 18,
    goalDifference: 10,
    points: 31,
    form: ['D', 'W', 'W', 'D', 'L'] as ('W' | 'D' | 'L')[],
    lastPosition: 5
  },
  {
    position: 5,
    team: { name: 'Newcastle United', shortName: 'Newcastle' },
    played: 15,
    won: 8,
    drawn: 5,
    lost: 2,
    goalsFor: 25,
    goalsAgainst: 20,
    goalDifference: 5,
    points: 29,
    form: ['W', 'D', 'D', 'W', 'L'] as ('W' | 'D' | 'L')[],
    lastPosition: 4
  }
];

const newsArticles = [
  {
    id: '1',
    title: 'Arsenal Maintain Title Challenge with Dominant Victory Over Chelsea',
    excerpt: 'The Gunners secured a crucial 2-1 victory at the Emirates Stadium to keep pace with the title race leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=200&fit=crop',
    author: 'James Miller',
    publishedAt: '2024-01-15T14:30:00Z',
    category: 'Match',
    readTime: 4,
    tags: ['Arsenal', 'Chelsea', 'Premier League']
  },
  {
    id: '2',
    title: 'Manchester City Eye January Transfer Window Reinforcements',
    excerpt: 'Pep Guardiola\'s side are reportedly looking to strengthen their squad with key signings in the upcoming transfer window.',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=200&fit=crop',
    author: 'Sarah Johnson',
    publishedAt: '2024-01-15T10:15:00Z',
    category: 'Transfer',
    readTime: 3,
    tags: ['Manchester City', 'Transfers', 'January Window']
  },
  {
    id: '3',
    title: 'Liverpool\'s Injury Crisis: How It Affects Their Title Hopes',
    excerpt: 'An in-depth analysis of Liverpool\'s current injury situation and its impact on their championship aspirations.',
    author: 'David Wilson',
    publishedAt: '2024-01-14T16:45:00Z',
    category: 'Analysis',
    readTime: 6,
    tags: ['Liverpool', 'Injuries', 'Title Race']
  }
];

const HomePage: React.FC = () => {
  const handleHeroClick = () => {
    // Navigate to fantasy page or sign up
    console.log('Hero CTA clicked');
  };

  const handleMatchClick = (match: any) => {
    console.log('Match clicked:', match.id);
  };

  const handleNewsClick = (article: any) => {
    console.log('News clicked:', article.id);
  };

  return (
    <div className="min-h-screen pt-6">
      {/* Hero Section */}
      <Hero onCtaClick={handleHeroClick} />

      {/* Live Ticker */}
      <LiveTicker className="mt-0" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Today's Matches */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-h2 text-white font-bold fade-up">Today's Matches</h2>
              <p className="text-neutral-300 mt-2 fade-up fade-up-delay-1">Live scores and upcoming fixtures</p>
            </div>
            <button className="btn-secondary fade-up fade-up-delay-2">
              View All Fixtures
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match, index) => (
              <div key={match.id} className={`fade-up fade-up-delay-${index + 1}`}>
                <MatchCard match={match} onClick={handleMatchClick} />
              </div>
            ))}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - League Table */}
          <div className="lg:col-span-2">
            <StandingsTable 
              standings={standings}
              className="fade-up"
            />
          </div>

          {/* Right Column - Latest News */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h3 text-white font-bold fade-up">Latest News</h2>
              <button className="text-accent-teal hover:text-accent-lime transition-colors text-sm font-medium fade-up fade-up-delay-1">
                View All
              </button>
            </div>
            
            {/* Featured News */}
            <div className="fade-up fade-up-delay-1">
              <NewsCard 
                article={newsArticles[0]}
                variant="featured"
                onClick={handleNewsClick}
              />
            </div>
            
            {/* Compact News */}
            <div className="space-y-4">
              {newsArticles.slice(1).map((article, index) => (
                <div key={article.id} className={`fade-up fade-up-delay-${index + 2}`}>
                  <NewsCard 
                    article={article}
                    variant="compact"
                    onClick={handleNewsClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fantasy Football Section */}
        <section className="mt-16 text-center">
          <div className="card bg-gradient-hero p-8 lg:p-12 fade-up">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-h1 text-white font-bold mb-4">
                Ready to Build Your Ultimate Team?
              </h2>
              <p className="text-body-lg text-neutral-200 mb-8">
                Join millions of fantasy football managers and compete for glory. Pick your players, 
                set your formation, and climb the leaderboards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary text-lg px-8 py-4">
                  Start Your Team
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                <button className="btn-secondary text-lg px-8 py-4">
                  Learn How to Play
                </button>
              </div>
              
              {/* Fantasy Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">8M+</div>
                  <div className="text-neutral-300">Fantasy Managers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">£100K</div>
                  <div className="text-neutral-300">Weekly Prizes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient mb-2">Free</div>
                  <div className="text-neutral-300">To Play</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;