import type { LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import { getUserCollection } from '../../services/players';
import Card from '../../components/Card';
import Grid from '../../components/Grid';

export async function loader({ request }: LoaderFunctionArgs) {
  // In a real app, you'd get the user ID from session/auth
  const userId = 'current-user'; // This would come from authentication
  const collection = await getUserCollection(userId);

  return { collection };
}

export default function Collection() {
  const { collection } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Collection</h1>
        <p className="text-gray-600">You have {collection.length} cards in your collection</p>
      </div>

      {collection.length > 0 ? (
        <Grid>
          {collection.map((player) => (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No cards yet</h3>
          <p className="text-gray-500 mb-6">Start collecting cards to build your fantasy team</p>
          <a
            href="/players"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Browse Players
          </a>
        </div>
      )}
    </div>
  );
}
