import type { LoaderFunctionArgs } from 'react-router';
import { Outlet, useLoaderData } from 'react-router';
import { getPlayers } from '../../services/players';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search') || '';
  const position = url.searchParams.get('position') || '';
  const team = url.searchParams.get('team') || '';

  const players = await getPlayers({ search, position, team });
  return { players, filters: { search, position, team } };
}

export default function PlayersLayout() {
  const { players, filters } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Players</h1>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Players</label>
              <input
                type="text"
                placeholder="Search by name..."
                defaultValue={filters.search}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <select
                defaultValue={filters.position}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Positions</option>
                <option value="GK">Goalkeeper</option>
                <option value="DEF">Defender</option>
                <option value="MID">Midfielder</option>
                <option value="FWD">Forward</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Team</label>
              <select
                defaultValue={filters.team}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Teams</option>
                <option value="arsenal">Arsenal</option>
                <option value="chelsea">Chelsea</option>
                <option value="liverpool">Liverpool</option>
                <option value="manchester-city">Manchester City</option>
                <option value="manchester-united">Manchester United</option>
                <option value="tottenham">Tottenham</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
