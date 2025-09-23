import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useAuth } from "../contexts/AuthContext";
import apiClient from "../services/http";
import { Player } from "../types";

export default function PlayerDetailPage() {
  const { playerId } = useParams<{ playerId: string }>();
  const navigate = useNavigate();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [buying, setBuying] = useState(false);
  const { user, loading: authLoading } = useAuth();
  // Buy player handler
  const handleBuy = async () => {
    if (!user || !player) return;
    setBuying(true);
    try {
      await apiClient.post("/collection/buy", {
        userId: user.id,
        playerId: player.id,
      });
      toast.success("Player purchased and added to your collection!");
      // Update user balance in context (force reload or refetch user)
      // For now, just update locally:
      player.price &&
        user.balance !== undefined &&
        (user.balance -= player.price);
    } catch (err: any) {
      toast.error(err.message || "Failed to buy player");
    } finally {
      setBuying(false);
    }
  };

  useEffect(() => {
    if (playerId) {
      fetchPlayer();
    }
  }, [playerId]);

  const fetchPlayer = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/players/${playerId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch player");
      }

      const data = await response.json();
      setPlayer(data);
    } catch (error) {
      console.error("Error fetching player:", error);
      toast.error("Failed to load player");
      navigate("/players");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !player ||
      !confirm(`Are you sure you want to delete ${player.name}?`)
    ) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(
        `http://localhost:4000/api/players/${player.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete player");
      }

      toast.success("Player deleted successfully");
      navigate("/players");
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.error("Failed to delete player");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Player not found
          </h2>
          <Link to="/players" className="text-blue-600 hover:text-blue-800">
            Back to Players
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-6 pb-8 bg-[#2e004f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-purple-300 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-purple-400">/</li>
            <li>
              <Link
                to="/players"
                className="text-purple-300 hover:text-white transition-colors"
              >
                Players
              </Link>
            </li>
            <li className="text-purple-400">/</li>
            <li className="text-white font-semibold">{player.name}</li>
          </ol>
        </nav>

        {/* Player Card */}
        <div className="bg-[#3a0a6c] rounded-xl shadow-lg overflow-hidden border border-purple-900">
          <div className="md:flex">
            {/* Player Image */}
            <div className="md:flex-shrink-0">
              {player.imageUrl ? (
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="w-full object-cover md:w-64 md:bg-purple-900 md:m-8 rounded-xl pt-4 md:border-purple-800 md:border"
                />
              ) : (
                <div className="h-64 w-full md:w-64 bg-purple-900 flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-purple-300"
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
            </div>

            {/* Player Details */}
            <div className="p-8 flex-1">
              {/* Buy Button */}

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {player.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-lg">
                    <span className="text-purple-200">{player.position}</span>
                    <span className="text-purple-400">•</span>
                    <span className="text-purple-200">{player.team}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-300 mb-1">
                    £{player.price}m
                  </div>
                  <div className="text-lg text-purple-200">
                    {player?.stats?.points} points
                  </div>
                </div>
              </div>

              {/* Description */}
              {player.description && (
                <div className="mb-2">
                  <div className="text-purple-300 text-sm mb-1 font-semibold">
                    Description
                  </div>
                  <div className="rounded-lg py-4 text-white text-base font-semibold">
                    {player.description}
                  </div>
                </div>
              )}

              {user && (
                <button
                  className="mb-4 px-4 py-2 rounded-full text-white font-bold shadow-lg bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed w-full"
                  disabled={
                    buying || authLoading || (user.balance ?? 0) < player.price
                  }
                  onClick={handleBuy}
                >
                  {buying ? "Processing..." : `Buy for £${player.price}m`}
                </button>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-[#2e004f] rounded-lg p-4 border border-purple-900">
                  <div className="text-sm text-purple-300 mb-1">Position</div>
                  <div className="text-lg font-semibold text-white">
                    {player.position}
                  </div>
                </div>
                <div className="bg-[#2e004f] rounded-lg p-4 border border-purple-900">
                  <div className="text-sm text-purple-300 mb-1">Team</div>
                  <div className="text-lg font-semibold text-white">
                    {player.team}
                  </div>
                </div>
                <div className="bg-[#2e004f] rounded-lg p-4 border border-purple-900">
                  <div className="text-sm text-purple-300 mb-1">Price</div>
                  <div className="text-lg font-semibold text-white">
                    £{player.price}m
                  </div>
                </div>
                <div className="bg-[#2e004f] rounded-lg p-4 border border-purple-900">
                  <div className="text-sm text-purple-300 mb-1">
                    Total Points
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {player?.stats?.points}
                  </div>
                </div>
                {/* Dynamic Stats */}
                {player.stats &&
                  Object.entries(player.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-[#2e004f] rounded-lg p-4 border border-purple-900 col-span-2 md:col-span-1"
                    >
                      <div className="text-sm text-purple-300 mb-1 capitalize">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {value}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
