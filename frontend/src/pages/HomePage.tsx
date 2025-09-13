import { useAuth } from "../contexts/AuthContext";
import Hero from "../components/ui/Hero";

export default function HomePage() {
  const { user } = useAuth();

  const handleHeroClick = () => {
    // Navigate to fantasy page or sign up
    if (user) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/auth/register";
    }
  };

  return (
    <div className="min-h-[calc(100svh-5rem)] flex items-center justify-center">
      {/* Hero Section */}
      <div className="w-full px-4">
        <Hero
          title="Premier League Fantasy"
          subtitle="Create your ultimate team and compete with friends in the most exciting fantasy football experience"
          ctaText={user ? "Go to Dashboard" : "Start Playing"}
          onCtaClick={handleHeroClick}
        />
      </div>
    </div>
  );
}
