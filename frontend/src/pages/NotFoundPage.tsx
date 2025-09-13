import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent-magenta rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-teal rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent-lime rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-accent-fuchsia rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
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
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Floating 404 with glow effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 text-display font-bold text-transparent bg-gradient-accent bg-clip-text blur-xl opacity-50 scale-110">
            404
          </div>
          <h1 className="text-display font-bold text-transparent bg-gradient-accent bg-clip-text relative z-10 mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-accent mx-auto rounded-full shadow-glow-accent"></div>
        </div>
        
        <div className="space-y-6 mb-12">
          <h2 className="text-h1 text-white font-bold">
            Page Not Found
          </h2>
          
          <p className="text-body-lg text-neutral-200 max-w-2xl mx-auto leading-relaxed">
            Looks like this page went off the pitch! The page you're looking for might have been transferred, 
            substituted, or is currently on the bench. Don't worry, we'll help you get back in the game.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            to="/"
            className="btn-primary text-lg px-8 py-4 shadow-glow-accent group"
          >
            Return Home
            <svg 
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="btn-secondary text-lg px-8 py-4 group"
          >
            Go Back
            <svg 
              className="ml-2 w-5 h-5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          </button>
        </div>

        {/* Popular Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-16">
          <Link to="/players" className="card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Players</h3>
            <p className="text-sm text-neutral-300">Browse all players</p>
          </Link>

          <Link to="/dashboard" className="card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Dashboard</h3>
            <p className="text-sm text-neutral-300">Your fantasy team</p>
          </Link>

          <Link to="/fixtures" className="card text-center group hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-white mb-1">Fixtures</h3>
            <p className="text-sm text-neutral-300">Upcoming matches</p>
          </Link>
        </div>
        
        {/* Decorative Footer */}
        <div className="flex items-center justify-center space-x-2 text-neutral-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span className="text-sm">Lost in the Premier League Fantasy universe?</span>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-8 hidden lg:block">
        <div className="glass-effect rounded-lg p-4 max-w-xs animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Error 404</div>
              <div className="text-xs text-neutral-300">Page not found</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-1/4 right-8 hidden lg:block">
        <div className="glass-effect rounded-lg p-4 max-w-xs animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-white">Safe Return</div>
              <div className="text-xs text-neutral-300">Go back home</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
