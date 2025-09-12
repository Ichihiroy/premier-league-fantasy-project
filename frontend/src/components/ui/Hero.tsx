import React from 'react';

interface HeroProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({
  title = "Premier League Fantasy",
  subtitle = "Create your ultimate team and compete with friends in the most exciting fantasy football experience",
  ctaText = "Start Playing",
  onCtaClick
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-magenta rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-teal rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-lime rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="fade-up">
          <h1 className="text-display text-white mb-6 tracking-tight">
            <span className="block text-gradient">{title.split(' ')[0]}</span>
            <span className="block">{title.split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>
        
        <div className="fade-up fade-up-delay-1">
          <p className="text-body-lg text-neutral-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="fade-up fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            className="btn-primary text-lg px-8 py-4 shadow-glow-accent"
            onClick={onCtaClick}
          >
            {ctaText}
            <svg 
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          
          <button className="btn-secondary text-lg px-8 py-4">
            Watch Highlights
            <svg 
              className="ml-2 w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-5-9a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="fade-up fade-up-delay-3 mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="card text-center">
            <div className="text-2xl font-bold text-gradient mb-2">2M+</div>
            <div className="text-neutral-300 text-sm">Active Players</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-gradient mb-2">£1B+</div>
            <div className="text-neutral-300 text-sm">Prize Pool</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-gradient mb-2">38</div>
            <div className="text-neutral-300 text-sm">Gameweeks</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white border-opacity-30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 hidden lg:block">
        <div className="glass-effect rounded-lg p-4 max-w-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm">Live Updates</div>
              <div className="text-xs text-neutral-300">Real-time scores</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 hidden lg:block">
        <div className="glass-effect rounded-lg p-4 max-w-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm">Smart Analytics</div>
              <div className="text-xs text-neutral-300">AI-powered insights</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;