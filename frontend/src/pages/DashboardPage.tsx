import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext";
import { PlaySquare } from "lucide-react";
import DashboardPageBackground from "../components/ui/DashboardPageBackground";

interface UserStats {
  totalCards: number;
  favoriteTeam: string;
  joinDate: string;
  lastLogin: string;
  fantasyPoints: number;
  currentRank: number;
  totalManagers: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Mock stats - replace with actual API call later
        const mockStats: UserStats = {
          totalCards: 47,
          favoriteTeam: "Manchester United",
          joinDate: new Date(user?.createdAt || Date.now()).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
            }
          ),
          lastLogin: "Today",
          fantasyPoints: 1247,
          currentRank: 125843,
          totalManagers: 8500000,
        };

        setStats(mockStats);
        setLoading(false);

        // Welcome toast
        toast.success(`Welcome back, ${user?.name}!`, {
          icon: "👋",
        });

        console.log(user);
      } catch (error) {
        console.error("❌ Failed to fetch user stats:", error);
        toast.error("Failed to load dashboard data");
        setLoading(false);
      }
    };

    if (user) {
      fetchUserStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2e004f] to-[#4a0d7a]">
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-xl bg-black/60 border border-purple-700/60">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6"></div>
          <p className="text-white text-lg font-semibold tracking-wide">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DashboardPageBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 fade-up">
            <h1 className="text-display text-white font-bold">
              Welcome back, <span className="text-gradient">{user?.name}</span>
            </h1>
            <p className="text-body-lg text-neutral-300 mt-2">
              Here's your fantasy football overview and latest updates
            </p>
            <p>
              {user?.balance !== undefined && user?.balance !== null && (
                <span className="text-sm text-neutral-400">
                  Account Balance:{" "}
                  {user.balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              )}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="card text-center fade-up">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats?.fantasyPoints.toLocaleString()}
              </div>
              <div className="text-neutral-300 text-sm">Fantasy Points</div>
            </div>

            <div className="card text-center fade-up fade-up-delay-1">
              <div className="text-3xl font-bold text-gradient mb-2">
                #{stats?.currentRank.toLocaleString()}
              </div>
              <div className="text-neutral-300 text-sm">Global Rank</div>
            </div>

            <div className="card text-center fade-up fade-up-delay-2">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats?.totalCards}
              </div>
              <div className="text-neutral-300 text-sm">Player Cards</div>
            </div>

            <div className="card text-center fade-up fade-up-delay-3">
              <div className="text-3xl font-bold text-gradient mb-2">
                {stats?.favoriteTeam.split(" ")[0]}
              </div>
              <div className="text-neutral-300 text-sm">Favorite Team</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card mb-12 fade-up">
            <h2 className="text-h2 text-white font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/players"
                className="btn-primary flex items-center justify-center space-x-2 p-4"
              >
                <PlaySquare className="w-5 h-5" />
                <span>Browse Players</span>
              </Link>

              <Link
                to="/collection"
                className="btn-secondary flex items-center justify-center space-x-2 p-4"
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span>My Collection</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
