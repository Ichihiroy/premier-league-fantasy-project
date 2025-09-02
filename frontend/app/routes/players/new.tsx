import type { ActionFunctionArgs } from 'react-router';
import { Form, redirect } from 'react-router';
import { createPlayer } from '../../services/players';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const playerData = {
    name: formData.get('name') as string,
    team: formData.get('team') as string,
    position: formData.get('position') as string,
    age: parseInt(formData.get('age') as string),
    nationality: formData.get('nationality') as string,
    imageUrl: formData.get('imageUrl') as string,
  };

  const player = await createPlayer(playerData);
  return redirect(`/players/${player.id}`);
}

export default function NewPlayer() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Player</h1>

      <Form method="post" className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Player Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="team" className="block text-sm font-medium text-gray-700">
              Team
            </label>
            <select
              id="team"
              name="team"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Team</option>
              <option value="arsenal">Arsenal</option>
              <option value="chelsea">Chelsea</option>
              <option value="liverpool">Liverpool</option>
              <option value="manchester-city">Manchester City</option>
              <option value="manchester-united">Manchester United</option>
              <option value="tottenham">Tottenham</option>
            </select>
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <select
              id="position"
              name="position"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Position</option>
              <option value="GK">Goalkeeper</option>
              <option value="DEF">Defender</option>
              <option value="MID">Midfielder</option>
              <option value="FWD">Forward</option>
            </select>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="16"
              max="45"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
            >
              Create Player
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
