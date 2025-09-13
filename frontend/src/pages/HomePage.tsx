import { useAuth } from '../contexts/AuthContext';
import Hero from '../components/ui/Hero';
import { bgBluePurple } from '../assets';

export default function HomePage() {
  const { user } = useAuth();

  const handleHeroClick = () => {
    // Navigate to fantasy page or sign up
    if (user) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/auth/register';
    }
  };

  return (
    <div 
      className="h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgBluePurple})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Hero Section - Full Height */}
      <div className="h-full flex flex-col">
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