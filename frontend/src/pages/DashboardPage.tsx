import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import LiveTicker from '../components/ui/LiveTicker';
import MatchCard from '../components/ui/MatchCard';
import NewsCard from '../components/ui/NewsCard';
import { bgOrangePurple } from '../assets';

// Mock user data - replace with actual API call
interface UserStats {
  totalCards: number;
  favoriteTeam: string;
  joinDate: string;
  lastLogin: string;
  fantasyPoints: number;
  currentRank: number;
  totalManagers: number;
}

// Sample data for dashboard
const upcomingMatches = [
  {
    id: '1',
    homeTeam: { name: 'Arsenal', shortName: 'ARS' },
    awayTeam: { name: 'Chelsea', shortName: 'CHE' },
    status: 'scheduled' as const,
    time: '15:00',
    date: 'Tomorrow',
    venue: 'Emirates Stadium',
    competition: 'Premier League'
  },
  {
    id: '2',
    homeTeam: { name: 'Manchester City', shortName: 'MCI' },
    awayTeam: { name: 'Liverpool', shortName: 'LIV' },
    status: 'scheduled' as const,
    time: '17:30',
    date: 'Sunday',
    venue: 'Etihad Stadium',
    competition: 'Premier League'
  }
];

const recentNews = [
  {
    id: '1',
    title: 'New Premier League Season Transfer Updates',
    excerpt: 'Latest transfers and player movements for the upcoming season.',
    author: 'Sports Desk',
    publishedAt: '2024-01-15T14:30:00Z',
    category: 'Transfer',
    readTime: 3,
    tags: ['Transfers', 'Premier League']
  },
  {
    id: '2',
    title: 'Fantasy Football Tips for Gameweek 15',
    excerpt: 'Expert picks and captain choices for the upcoming gameweek.',
    author: 'Fantasy Expert',
    publishedAt: '2024-01-15T10:15:00Z',
    category: 'Fantasy',
    readTime: 4,
    tags: ['Fantasy', 'Tips']
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Mock stats - replace with actual API call later
        const mockStats: UserStats = {
          totalCards: 47,
          favoriteTeam: 'Manchester United',
          joinDate: new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          }),
          lastLogin: 'Today',
          fantasyPoints: 1247,
          currentRank: 125843,
          totalManagers: 8500000
        };

        setStats(mockStats);
        setLoading(false);
        
        // Welcome toast
        toast.success(`Welcome back, ${user?.name}!`, {
          icon: '👋',
        });
      } catch (error) {
        console.error('❌ Failed to fetch user stats:', error);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-magenta border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const handleMatchClick = (match: any) => {
    console.log('Match clicked:', match.id);
  };

  const handleNewsClick = (article: any) => {
    console.log('News clicked:', article.id);
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bgOrangePurple})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative z-10">
        {/* Live Ticker */}
        <LiveTicker />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 fade-up">
          <h1 className="text-display text-white font-bold">
            Welcome back, <span className="text-gradient">{user?.name}</span>
          </h1>
          <p className="text-body-lg text-neutral-300 mt-2">
            Here's your fantasy football overview and latest updates
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="card text-center fade-up">
            <div className="text-3xl font-bold text-gradient mb-2">
              {stats?.fantasyPoints.toLocaleString()}
            </div>
            <div className="text-neutral-300 text-sm">Fantasy Points</div>
          </div>
          
          <div className="card text-center fade-up fade-up-delay-1">
            <div className="text-3xl font-bold text-gradient mb-2">
              #{stats?.currentRank.toLocaleString()}
            </div>
            <div className="text-neutral-300 text-sm">Global Rank</div>
          </div>
          
          <div className="card text-center fade-up fade-up-delay-2">
            <div className="text-3xl font-bold text-gradient mb-2">
              {stats?.totalCards}
            </div>
            <div className="text-neutral-300 text-sm">Player Cards</div>
          </div>
          
          <div className="card text-center fade-up fade-up-delay-3">
            <div className="text-3xl font-bold text-gradient mb-2">
              {stats?.favoriteTeam.split(' ')[0]}
            </div>
            <div className="text-neutral-300 text-sm">Favorite Team</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-12 fade-up">
          <h2 className="text-h2 text-white font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/players" 
              className="btn-primary flex items-center justify-center space-x-2 p-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Browse Players</span>
            </Link>
            
            <Link 
              to="/collection" 
              className="btn-secondary flex items-center justify-center space-x-2 p-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>My Collection</span>
            </Link>
            
            <Link 
              to="/fixtures" 
              className="btn-secondary flex items-center justify-center space-x-2 p-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>View Fixtures</span>
            </Link>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upcoming Matches */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h2 text-white font-bold fade-up">Upcoming Matches</h2>
              <Link to="/fixtures" className="text-accent-teal hover:text-accent-lime transition-colors text-sm font-medium fade-up fade-up-delay-1">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMatches.map((match, index) => (
                <div key={match.id} className={`fade-up fade-up-delay-${index + 1}`}>
                  <MatchCard match={match} onClick={handleMatchClick} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Recent News & Account */}
          <div className="space-y-8">
            {/* Account Summary */}
            <div className="card fade-up">
              <h3 className="text-lg font-semibold text-white mb-4">Account Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Member since</span>
                  <span className="text-white">{stats?.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Last login</span>
                  <span className="text-white">{stats?.lastLogin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Total managers</span>
                  <span className="text-white">{stats?.totalManagers.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Recent News */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 text-white font-bold fade-up">Latest News</h2>
              </div>
              
              <div className="space-y-4">
                {recentNews.map((article, index) => (
                  <div key={article.id} className={`fade-up fade-up-delay-${index + 1}`}>
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
        </div>
        </div>
      </div>
    </div>
  );
}