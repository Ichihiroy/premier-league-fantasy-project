import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Search } from "lucide-react";

interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  price: number;
  points: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

interface PlayersResponse {
  data: Player[];
  meta: PaginationMeta;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchTerm = searchParams.get("search") || "";
  const positionFilter = searchParams.get("position") || "";
  const teamFilter = searchParams.get("team") || "";

  useEffect(() => {
    fetchPlayers();
  }, [searchParams]);

  const fetchPlayers = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (searchTerm) params.set("search", searchTerm);
      if (positionFilter) params.set("position", positionFilter);
      if (teamFilter) params.set("team", teamFilter);
      if (searchTerm || positionFilter || teamFilter || currentPage > 1) {
        if (currentPage > 1) params.set("page", currentPage.toString());
      }

      const url = params.toString()
        ? `http://localhost:4000/api/players?${params}`
        : `http://localhost:4000/api/players`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }

      const data: PlayersResponse = await response.json();
      setPlayers(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.error("Error fetching players:", error);
      toast.error("Failed to load players");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page"); // Reset to first page
    setSearchParams(newParams);
  };

  const handleFilterChange = (
    filterType: "position" | "team",
    value: string
  ) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(filterType, value);
    } else {
      newParams.delete(filterType);
    }
    newParams.delete("page"); // Reset to first page
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];
  const teams = [
    "Arsenal",
    "Aston Villa",
    "Brighton",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sheffield United",
    "Tottenham",
    "West Ham",
    "Wolves",
    "Bournemouth",
    "Brentford",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent-magenta border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading players...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 fade-up">
          <div>
            <h1 className="text-display text-white font-bold">
              Player Database
            </h1>
            <p className="text-body-lg text-neutral-300 mt-2">
              Discover and analyze Premier League talent
            </p>
          </div>
          <Link
            to="/players/new"
            className="btn-primary flex items-center space-x-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add Player</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-8 fade-up fade-up-delay-1">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Search Players
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search by name..."
                  className="input-field w-full pl-10"
                />
                <Search
                  size={5}
                  className="absolute left-3 top-5 transform -translate-y-1/2 w-4 h-4 text-neutral-400"
                />
              </div>
            </div>

            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Position
              </label>
              <select
                value={positionFilter}
                onChange={(e) => handleFilterChange("position", e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Positions</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            {/* Team Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Team
              </label>
              <select
                value={teamFilter}
                onChange={(e) => handleFilterChange("team", e.target.value)}
                className="input-field w-full"
              >
                <option value="">All Teams</option>
                {teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => setSearchParams({})}
                className="btn-secondary w-full"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {players?.map((player, index) => (
            <div
              key={player.id}
              className={`card card-hover cursor-pointer fade-up fade-up-delay-${
                (index % 4) + 1
              }`}
              onClick={() => navigate(`/players/${player.id}`)}
            >
              {player.imageUrl ? (
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="w-full h-auto object-cover rounded-t-xl"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-t-xl flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-neutral-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-3">
                  {player.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-400">Position</span>
                    <span className="text-sm font-medium text-accent-teal">
                      {player.position}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-400">Team</span>
                    <span className="text-sm text-white">{player.team}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-400">Price</span>
                    <span className="text-sm font-medium text-accent-lime">
                      £{player.price}m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {players?.length === 0 && (
          <div className="text-center py-16 fade-up">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent-magenta to-accent-teal flex items-center justify-center">
              <svg
                className="w-12 h-12 text-white"
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
            <h3 className="text-h3 text-white font-bold mb-2">
              No players found
            </h3>
            <p className="text-neutral-300 mb-6 max-w-md mx-auto">
              {searchTerm || positionFilter || teamFilter
                ? "Try adjusting your search criteria or filters to find more players"
                : "Build your database by adding your first player to get started"}
            </p>
            <Link
              to="/players/new"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add First Player</span>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {meta && meta.total_pages > 1 && (
          <div className="card fade-up">
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex space-x-1">
                {Array.from(
                  { length: Math.min(meta.total_pages, 5) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-gradient-to-r from-accent-magenta to-accent-teal text-white"
                            : "text-neutral-300 hover:text-white hover:bg-neutral-700"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === meta.total_pages}
                className="btn-secondary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Results Info */}
            <div className="text-center mt-4 text-sm text-neutral-400">
              Showing {(currentPage - 1) * meta.per_page + 1} to{" "}
              {Math.min(currentPage * meta.per_page, meta.total)} of{" "}
              {meta.total} players
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
