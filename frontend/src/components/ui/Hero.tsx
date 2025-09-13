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
    <section className="relative h-full flex items-center justify-center overflow-hidden">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-black/20">
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
          <h1 className="text-display text-white mb-6 tracking-tight font-premier">
            <span className="block text-gradient">{title.split(' ')[0]}</span>
            <span className="block">{title.split(' ').slice(1).join(' ')}</span>
          </h1>
        </div>
        
        <div className="fade-up fade-up-delay-1">
          <p className="text-body-lg text-neutral-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="fade-up fade-up-delay-2 flex justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default Hero;