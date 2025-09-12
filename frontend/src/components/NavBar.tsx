import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle scroll effect with minimize
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      setShowMobileMenu(false);
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`
          bg-white/10 backdrop-blur-xl border border-white/20 rounded-full
          shadow-2xl transition-all duration-300
          ${isScrolled ? 'shadow-lg' : 'shadow-2xl'}
        `}>
          <div className="flex justify-between items-center px-6 py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-magenta to-accent-teal rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-accent-magenta to-accent-teal rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-200 blur-sm"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gradient">Fantasy League</span>
                <div className="text-xs text-neutral-300 -mt-1">Premier Edition</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white shadow-lg' 
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                Home
              </Link>
              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive('/dashboard') 
                        ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white shadow-lg' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/players"
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive('/players') 
                        ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white shadow-lg' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Players
                  </Link>
                  <Link
                    to="/collection"
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive('/collection') 
                        ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white shadow-lg' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Collection
                  </Link>
                  <Link
                    to="/fixtures"
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                      isActive('/fixtures') 
                        ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white shadow-lg' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Fixtures
                  </Link>
                </>
              )}
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent-magenta to-accent-teal rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="text-white font-medium text-sm">{user.name}</div>
                      <div className="text-neutral-400 text-xs">Manager</div>
                    </div>
                    <svg className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-3 w-56 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl py-2 z-50">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-neutral-400 text-sm">{user.email}</div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center space-x-3 px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                      </Link>
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-neutral-300 hover:text-red-400 hover:bg-white/10 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/auth/login"
                    className="text-neutral-300 hover:text-white font-medium transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className="bg-gradient-to-r from-accent-magenta to-accent-teal text-white px-4 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 hover:bg-white/20 transition-all duration-200"
              >
                <svg className={`w-6 h-6 text-white transition-transform duration-200 ${showMobileMenu ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden border-t border-white/10">
              <div className="px-6 py-4 space-y-2">
                <Link 
                  to="/" 
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                    isActive('/') 
                      ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white' 
                      : 'text-neutral-300 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  Home
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive('/dashboard') 
                          ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white' 
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/players" 
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive('/players') 
                          ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white' 
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Players
                    </Link>
                    <Link
                      to="/collection"
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive('/collection') 
                          ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white' 
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Collection
                    </Link>
                    <Link
                      to="/fixtures"
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActive('/fixtures') 
                          ? 'bg-gradient-to-r from-accent-magenta to-accent-teal text-white' 
                          : 'text-neutral-300 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Fixtures
                    </Link>
                  </>
                )}
                {!user && (
                  <div className="pt-4 border-t border-white/10 space-y-2">
                    <Link
                      to="/auth/login"
                      className="block px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/10 rounded-lg font-medium transition-all duration-200"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/auth/register"
                      className="block px-4 py-3 bg-gradient-to-r from-accent-magenta to-accent-teal text-white rounded-lg font-medium text-center"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}