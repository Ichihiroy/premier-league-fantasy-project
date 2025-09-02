import { useLoaderData, Link } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';
import { getPlayers } from '../../services/players';
import Card from '../../components/Card';
import Grid from '../../components/Grid';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const position = url.searchParams.get('position') || '';
  const team = url.searchParams.get('team') || '';

  const playersData = await getPlayers({ search, position, team });
  return { players: playersData.players || [], total: playersData.total || 0 };
}

export default function PlayersIndex() {
  const { players, total } = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Players ({total})</h2>
        <Link
          to="/players/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Add New Player
        </Link>
      </div>

      {players.length > 0 ? (
        <Grid cols={4}>
          {players.map((player) => (
            <Card key={player.id} player={player} />
          ))}
        </Grid>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
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
          <h3 className="text-xl font-medium text-gray-900 mb-2">No players found</h3>
          <p className="text-gray-500 mb-6">
            No players match your current filters. Try adjusting your search criteria.
          </p>
          <Link
            to="/players/new"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add First Player
          </Link>
        </div>
      )}
    </div>
  );
}
