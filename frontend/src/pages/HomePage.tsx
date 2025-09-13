import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/ui/Hero';
import LiveTicker from '../components/ui/LiveTicker';
import MatchCard from '../components/ui/MatchCard';
import StandingsTable from '../components/ui/StandingsTable';
import NewsCard from '../components/ui/NewsCard';
import RefreshControls from '../components/ui/RefreshControls';
import { useFootballData, useOnlineStatus } from '../hooks/useFootballData';

export default function HomePage() {
  const { user } = useAuth();
  
  // Use real football data
  const {
    standings,
    todaysMatches,
    autoRefresh,
    refreshRate,
    toggleAutoRefresh,
    updateRefreshRate,
  } = useFootballData();
  
  const isOnline = useOnlineStatus();

  // Debug logs
  console.log('HomePage Debug:', {
    standingsData: standings.data,
    standingsLoading: standings.loading,
    standingsError: standings.error,
    autoRefresh,
    isOnline
  });

  const handleHeroClick = () => {
    // Navigate to fantasy page or sign up
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/auth/register';
    }
  };

  const handleMatchClick = (match: any) => {
    console.log('Match clicked:', match.id);
  };

  const handleNewsClick = (article: any) => {
    console.log('News clicked:', article.id);
  };

  // Mock news data (this would come from another API)
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

  return (
    <div className="min-h-screen pt-6">
      {/* Hero Section */}
      <Hero 
        title="Premier League Fantasy"
        subtitle="Create your ultimate team and compete with friends in the most exciting fantasy football experience"
        ctaText={user ? "Go to Dashboard" : "Start Playing"}
        onCtaClick={handleHeroClick} 
      />

      {/* Live Ticker */}
      <LiveTicker className="mt-0" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Real-time Data Controls */}
        <RefreshControls
          autoRefresh={autoRefresh}
          refreshRate={refreshRate}
          onToggleAutoRefresh={toggleAutoRefresh}
          onUpdateRefreshRate={updateRefreshRate}
          lastUpdated={standings.lastUpdated}
          isOnline={isOnline}
        />

        {/* Today's Matches */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-h2 text-white font-bold fade-up">Today's Matches</h2>
              <p className="text-neutral-300 mt-2 fade-up fade-up-delay-1">Live scores and upcoming fixtures</p>
            </div>
            <Link to="/fixtures" className="btn-secondary fade-up fade-up-delay-2">
              View All Fixtures
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysMatches.loading ? (
              // Loading skeleton for matches
              [...Array(3)].map((_, index) => (
                <div key={index} className="card animate-pulse">
                  <div className="h-20 bg-neutral-700 rounded"></div>
                </div>
              ))
            ) : todaysMatches.data && todaysMatches.data.length > 0 ? (
              todaysMatches.data.map((match, index) => (
                <div key={match.id} className={`fade-up fade-up-delay-${index + 1}`}>
                  <MatchCard match={match} onClick={handleMatchClick} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-neutral-400">No matches scheduled for today</p>
              </div>
            )}
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - League Table */}
          <div className="lg:col-span-2">
            <StandingsTable 
              standings={standings.data || []}
              loading={standings.loading}
              error={standings.error}
              lastUpdated={standings.lastUpdated}
              onRefresh={standings.refresh}
              autoRefresh={autoRefresh}
              className="fade-up"
            />
          </div>

          {/* Right Column - Latest News */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h3 text-white font-bold fade-up">Latest News</h2>
              <Link to="/news" className="text-accent-teal hover:text-accent-lime transition-colors text-sm font-medium fade-up fade-up-delay-1">
                View All
              </Link>
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

        {/* Call to Action */}
        <div className="text-center py-16">
          {!user && (
            <Link
              to="/auth/register"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg text-lg"
            >
              Start Playing Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}