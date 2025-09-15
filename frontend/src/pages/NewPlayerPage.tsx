import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";

const playerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"], {
    required_error: "Position is required",
  }),
  team: z.string().min(1, "Team is required"),
  price: z
    .number()
    .min(0.1, "Price must be at least 0.1")
    .max(20, "Price cannot exceed 20"),
  points: z.number().min(0, "Points cannot be negative"),
  image_url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type PlayerFormData = z.infer<typeof playerSchema>;

export default function NewPlayerPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PlayerFormData>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      name: "",
      position: "Midfielder",
      team: "",
      price: 5.0,
      points: 0,
      image_url: "",
    },
  });

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
  ].sort();

  const onSubmit = async (data: PlayerFormData) => {
    try {
      setSubmitting(true);

      // Clean up image_url - convert empty string to undefined
      const cleanData = {
        ...data,
        image_url: data.image_url || undefined,
      };

      const response = await fetch("http://localhost:4000/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(cleanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create player");
      }

      const newPlayer = await response.json();
      toast.success("Player created successfully!");
      navigate(`/players/${newPlayer.id}`);
    } catch (error) {
      console.error("Error creating player:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create player"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-6 pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                to="/"
                className="text-purple-400 hover:text-cyan-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-purple-300">/</li>
            <li>
              <Link
                to="/players"
                className="text-purple-400 hover:text-cyan-300 transition-colors"
              >
                Players
              </Link>
            </li>
            <li className="text-purple-300">/</li>
            <li className="text-white font-semibold">New Player</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white drop-shadow">
            Add New Player
          </h1>
          <p className="mt-2 text-purple-200">
            Create a new Premier League player profile
          </p>
        </div>

        {/* Form */}
        <div className="bg-purple-900 rounded-xl shadow-lg p-6 border border-purple-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Player Name *
              </label>
              <input
                type="text"
                {...register("name")}
                className={`w-full px-3 py-2 border rounded-lg bg-purple-950/60 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  errors.name ? "border-red-500" : "border-purple-700"
                }`}
                placeholder="e.g. Mohamed Salah"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Position and Team Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Position */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">
                  Position *
                </label>
                <select
                  {...register("position")}
                  className={`w-full px-3 py-2 border rounded-lg bg-purple-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    errors.position ? "border-red-500" : "border-purple-700"
                  }`}
                >
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.position.message}
                  </p>
                )}
              </div>

              {/* Team */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">
                  Team *
                </label>
                <select
                  {...register("team")}
                  className={`w-full px-3 py-2 border rounded-lg bg-purple-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    errors.team ? "border-red-500" : "border-purple-700"
                  }`}
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                {errors.team && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.team.message}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Points Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-1">
                  Price (£m) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="20"
                  {...register("price", { valueAsNumber: true })}
                  className={`w-full px-3 py-2 border rounded-lg bg-purple-950/60 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    errors.price ? "border-red-500" : "border-purple-700"
                  }`}
                  placeholder="5.0"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.price.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-1">
                Image URL (optional)
              </label>
              <input
                type="url"
                {...register("image_url")}
                className={`w-full px-3 py-2 border rounded-lg bg-purple-950/60 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  errors.image_url ? "border-red-500" : "border-purple-700"
                }`}
                placeholder="https://example.com/player-image.jpg"
              />
              {errors.image_url && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.image_url.message}
                </p>
              )}
              <p className="mt-1 text-xs text-purple-300">
                Enter a valid URL for the player's image
              </p>
            </div>

            {/* Image Preview */}
            {watch("image_url") && (
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Image Preview
                </label>
                <img
                  src={watch("image_url")}
                  alt="Player preview"
                  className="w-32 h-32 object-cover rounded-lg border border-cyan-400 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-purple-700">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 btn-primary text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:from-cyan-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? "Creating Player..." : "Create Player"}
              </button>
              <Link
                to="/players"
                className="flex-1 text-center bg-purple-950/60 text-purple-200 py-2 px-4 rounded-lg hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-purple-700"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
