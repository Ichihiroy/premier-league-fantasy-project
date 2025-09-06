import type { MetaFunction } from 'react-router';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Fantasy Cards - Premier League' },
    { name: 'description', content: 'Collect and trade Premier League player cards!' },
  ];
};

export default function Index() {
  const [cookieInfo, setCookieInfo] = useState<string>('');

  useEffect(() => {
    // Check if cookie exists after component mounts
    if (typeof document !== 'undefined') {
      const cookies = document.cookie;
      setCookieInfo(cookies || 'No cookies found');
      console.log('🍪 Current cookies on home page:', cookies);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Fantasy Cards</h1>
          <p className="text-xl text-gray-600 mb-8">
            Collect, trade, and showcase Premier League player cards
          </p>
          
          {/* Debug info */}
          <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Debug - Cookies:</strong> {cookieInfo}
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/players"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              Browse Players
            </Link>
            <Link
              to="/collection"
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
            >
              My Collection
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Collect Cards</h3>
            <p className="text-gray-600">
              Discover and collect cards of your favorite Premier League players
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Trade with Friends</h3>
            <p className="text-gray-600">
              Exchange cards with other collectors to complete your collection
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Build Your Dream Team</h3>
            <p className="text-gray-600">
              Create the ultimate fantasy team with your collected cards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
