import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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

export default function PlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (playerId) {
      fetchPlayer();
    }
  }, [playerId]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/api/players/${playerId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch player');
      }

      const data = await response.json();
      setPlayer(data);
    } catch (error) {
      console.error('Error fetching player:', error);
      toast.error('Failed to load player');
      navigate('/players');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!player || !confirm(`Are you sure you want to delete ${player.name}?`)) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`http://localhost:4000/api/players/${player.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete player');
      }

      toast.success('Player deleted successfully');
      navigate('/players');
    } catch (error) {
      console.error('Error deleting player:', error);
      toast.error('Failed to delete player');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Player not found</h2>
          <Link
            to="/players"
            className="text-blue-600 hover:text-blue-800"
          >
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link to="/players" className="text-blue-600 hover:text-blue-800">
                Players
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{player.name}</li>
          </ol>
        </nav>

        {/* Player Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Player Image */}
            <div className="md:flex-shrink-0">
              {player.image_url ? (
                <img
                  src={player.image_url}
                  alt={player.name}
                  className="h-64 w-full object-cover md:w-64"
                />
              ) : (
                <div className="h-64 w-full md:w-64 bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Player Details */}
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {player.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-lg">
                    <span className="text-gray-600">{player.position}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{player.team}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    £{player.price}m
                  </div>
                  <div className="text-lg text-green-600">
                    {player.points} points
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Position</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {player.position}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Team</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {player.team}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="text-lg font-semibold text-gray-900">
                    £{player.price}m
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Total Points</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {player.points}
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="border-t pt-6 mb-6">
                <div className="flex justify-between text-sm text-gray-500">
                  <div>
                    Created: {new Date(player.created_at).toLocaleDateString()}
                  </div>
                  <div>
                    Updated: {new Date(player.updated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/players/${player.id}/edit`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Player
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? 'Deleting...' : 'Delete Player'}
                </button>
                <Link
                  to="/players"
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Back to Players
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {player.points}
              </div>
              <div className="text-sm text-gray-600">Total Points</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                £{player.price}m
              </div>
              <div className="text-sm text-gray-600">Current Price</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {(player.points / player.price).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Points per £m</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
