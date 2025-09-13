import { useAuth } from "../contexts/AuthContext";
import Hero from "../components/ui/Hero";
import HomePageBackground from "../components/ui/HomePageBackground";

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <HomePageBackground />
      {/* Hero Section */}
      <div className="w-full px-4 z-10">
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
