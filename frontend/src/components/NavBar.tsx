import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { logoCompact } from "../assets";

export default function NavBar() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // No scroll-based transparency/minimize logic; navbar stays solid

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
      setShowMobileMenu(false);
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="w-full max-w-5xl px-2 sm:px-4">
        {/* Fully rounded pill navbar container */}
        <div className="mt-4 bg-[#6a1b9a] text-white shadow-2xl rounded-full border-2 border-white/10 flex items-center justify-between px-6 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <img
                src={logoCompact}
                alt="Fantasy League"
                className="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-white font-premier">
                Fantasy League
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-1.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                isActive("/")
                  ? "bg-white text-purple-800 border-white shadow"
                  : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60"
              }`}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-4 py-1.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                    isActive("/dashboard")
                      ? "bg-white text-purple-800 border-white shadow"
                      : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/players"
                  className={`px-4 py-1.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                    isActive("/players")
                      ? "bg-white text-purple-800 border-white shadow"
                      : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60"
                  }`}
                >
                  Players
                </Link>
                <Link
                  to="/collection"
                  className={`px-4 py-1.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 ${
                    isActive("/collection")
                      ? "bg-white text-purple-800 border-white shadow"
                      : "bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-white/60"
                  }`}
                >
                  Collection
                </Link>
              </>
            )}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-200 transition-all duration-200 group"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-gray-800 font-medium text-sm">
                      {user.name}
                    </div>
                  </div>
                  <svg
                    className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-gray-800 font-medium text-sm">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                      </svg>
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors text-sm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="text-white hover:text-purple-200 font-medium transition-colors duration-200 text-sm px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-white text-purple-800 px-3 py-1.5 rounded-lg font-medium hover:bg-purple-100 transition-all duration-200 text-sm"
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
              <svg
                className={`w-6 h-6 text-white transition-transform duration-200 ${
                  showMobileMenu ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    showMobileMenu
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
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
                  isActive("/")
                    ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                    : "text-neutral-300 hover:text-white hover:bg-white/10"
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
                      isActive("/dashboard")
                        ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                        : "text-neutral-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/players"
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/players")
                        ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                        : "text-neutral-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Players
                  </Link>
                  <Link
                    to="/collection"
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/collection")
                        ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                        : "text-neutral-300 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Collection
                  </Link>
                  <Link
                    to="/fixtures"
                    className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive("/fixtures")
                        ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                        : "text-neutral-300 hover:text-white hover:bg-white/10"
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
    </nav>
  );
}
