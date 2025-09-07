import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  price: number;
  points: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface PlayersResponse {
  data: Player[];
  meta: PaginationMeta;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const searchTerm = searchParams.get('search') || '';
  const positionFilter = searchParams.get('position') || '';
  const teamFilter = searchParams.get('team') || '';

  useEffect(() => {
    fetchPlayers();
  }, [searchParams]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentPage > 1) params.set('page', currentPage.toString());
      if (searchTerm) params.set('search', searchTerm);
      if (positionFilter) params.set('position', positionFilter);
      if (teamFilter) params.set('team', teamFilter);

      const response = await fetch(`http://localhost:4000/api/players?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }

      const data: PlayersResponse = await response.json();
      setPlayers(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.error('Error fetching players:', error);
      toast.error('Failed to load players');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    newParams.delete('page'); // Reset to first page
    setSearchParams(newParams);
  };

  const handleFilterChange = (filterType: 'position' | 'team', value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    newParams.delete('page'); // Reset to first page
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const positions = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'];
  const teams = [
    'Arsenal', 'Aston Villa', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace',
    'Everton', 'Fulham', 'Liverpool', 'Luton Town', 'Manchester City', 
    'Manchester United', 'Newcastle United', 'Nottingham Forest', 'Sheffield United',
    'Tottenham', 'West Ham', 'Wolves', 'Bournemouth', 'Brentford'
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Players</h1>
            <p className="mt-2 text-gray-600">
              Browse and manage Premier League players
            </p>
          </div>
          <Link
            to="/players/new"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Player
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search players..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <select
                value={positionFilter}
                onChange={(e) => handleFilterChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Positions</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team
              </label>
              <select
                value={teamFilter}
                onChange={(e) => handleFilterChange('team', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Teams</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setSearchParams({})}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/players/${player.id}`)}
            >
              {player.image_url && (
                <img
                  src={player.image_url}
                  alt={player.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {player.name}
                </h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">{player.position}</span>
                  <span className="text-sm font-medium text-blue-600">
                    £{player.price}m
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{player.team}</span>
                  <span className="text-sm font-medium text-green-600">
                    {player.points} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {players.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No players found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || positionFilter || teamFilter
                ? 'Try adjusting your filters'
                : 'Get started by adding your first player'}
            </p>
            <Link
              to="/players/new"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Player
            </Link>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.total_pages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-gray-500 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {Array.from({ length: meta.total_pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg ${
                  page === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === meta.total_pages}
              className="px-3 py-2 text-gray-500 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* Results Info */}
        {meta && (
          <div className="text-center mt-4 text-sm text-gray-600">
            Showing {((currentPage - 1) * meta.per_page) + 1} to{' '}
            {Math.min(currentPage * meta.per_page, meta.total)} of {meta.total} players
          </div>
        )}
      </div>
    </div>
  );
}
