import { Link } from 'react-router';

export default function NavBar() {
  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Fantasy Cards</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/players"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Players
            </Link>
            <Link
              to="/collection"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              My Collection
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t">
        <div className="px-4 py-2 space-y-1">
          <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Home
          </Link>
          <Link to="/players" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
            Players
          </Link>
          <Link
            to="/collection"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            My Collection
          </Link>
        </div>
      </div>
    </nav>
  );
}
