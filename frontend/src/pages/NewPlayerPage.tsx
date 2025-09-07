import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

const playerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  position: z.enum(['Goalkeeper', 'Defender', 'Midfielder', 'Forward'], {
    required_error: 'Position is required',
  }),
  team: z.string().min(1, 'Team is required'),
  price: z.number().min(0.1, 'Price must be at least 0.1').max(20, 'Price cannot exceed 20'),
  points: z.number().min(0, 'Points cannot be negative'),
  image_url: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type PlayerFormData = z.infer<typeof playerSchema>;

export default function NewPlayerPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: '',
      position: 'Midfielder',
      team: '',
      price: 5.0,
      points: 0,
      image_url: '',
    },
  });

  const teams = [
    'Arsenal', 'Aston Villa', 'Brighton', 'Burnley', 'Chelsea', 'Crystal Palace',
    'Everton', 'Fulham', 'Liverpool', 'Luton Town', 'Manchester City', 
    'Manchester United', 'Newcastle United', 'Nottingham Forest', 'Sheffield United',
    'Tottenham', 'West Ham', 'Wolves', 'Bournemouth', 'Brentford'
  ].sort();

  const onSubmit = async (data: PlayerFormData) => {
    try {
      setSubmitting(true);
      
      // Clean up image_url - convert empty string to undefined
      const cleanData = {
        ...data,
        image_url: data.image_url || undefined,
      };

      const response = await fetch('http://localhost:4000/api/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create player');
      }

      const newPlayer = await response.json();
      toast.success('Player created successfully!');
      navigate(`/players/${newPlayer.id}`);
    } catch (error) {
      console.error('Error creating player:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create player');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <li className="text-gray-900 font-medium">New Player</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Player</h1>
          <p className="mt-2 text-gray-600">
            Create a new Premier League player profile
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Player Name *
              </label>
              <input
                type="text"
                {...register('name')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g. Mohamed Salah"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Position and Team Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position *
                </label>
                <select
                  {...register('position')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.position ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>
                )}
              </div>

              {/* Team */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team *
                </label>
                <select
                  {...register('team')}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.team ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                {errors.team && (
                  <p className="mt-1 text-sm text-red-600">{errors.team.message}</p>
                )}
              </div>
            </div>

            {/* Price and Points Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (£m) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="20"
                  {...register('price', { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="5.0"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              {/* Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Points *
                </label>
                <input
                  type="number"
                  min="0"
                  {...register('points', { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.points ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0"
                />
                {errors.points && (
                  <p className="mt-1 text-sm text-red-600">{errors.points.message}</p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                {...register('image_url')}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.image_url ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="https://example.com/player-image.jpg"
              />
              {errors.image_url && (
                <p className="mt-1 text-sm text-red-600">{errors.image_url.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Enter a valid URL for the player's image
              </p>
            </div>

            {/* Image Preview */}
            {watch('image_url') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Preview
                </label>
                <img
                  src={watch('image_url')}
                  alt="Player preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Creating Player...' : 'Create Player'}
              </button>
              <Link
                to="/players"
                className="flex-1 text-center bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
