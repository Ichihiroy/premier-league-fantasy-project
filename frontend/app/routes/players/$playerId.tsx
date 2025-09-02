import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData, Link } from 'react-router';
import { getPlayerById } from '../../services/players';
import Card from '../../components/Card';

export async function loader({ params }: LoaderFunctionArgs) {
  const playerId = params.playerId;
  if (!playerId) {
    throw new Response('Not Found', { status: 404 });
  }

  const player = await getPlayerById(playerId);
  if (!player) {
    throw new Response('Not Found', { status: 404 });
  }

  return { player };
}

export default function PlayerDetails() {
  const { player } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link to="/players" className="text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Players
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card player={player} size="large" />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{player.name}</h1>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Team</span>
              <p className="text-lg text-gray-900">{player.team}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Position</span>
              <p className="text-lg text-gray-900">{player.position}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Age</span>
              <p className="text-lg text-gray-900">{player.age}</p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-500">Nationality</span>
              <p className="text-lg text-gray-900">{player.nationality}</p>
            </div>

            {player.stats && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Season Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-500">Goals</span>
                    <p className="text-2xl font-bold text-gray-900">{player.stats.goals}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm font-medium text-gray-500">Assists</span>
                    <p className="text-2xl font-bold text-gray-900">{player.stats.assists}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
