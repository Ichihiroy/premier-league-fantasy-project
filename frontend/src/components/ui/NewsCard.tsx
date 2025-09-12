import React from 'react';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
  tags?: string[];
}

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onClick,
  className = '',
  variant = 'default'
}) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Transfer': 'bg-accent-magenta bg-opacity-20 text-accent-magenta',
      'Match': 'bg-accent-teal bg-opacity-20 text-accent-teal',
      'News': 'bg-accent-lime bg-opacity-20 text-accent-lime',
      'Analysis': 'bg-primary-400 bg-opacity-20 text-primary-400',
      'Injury': 'bg-semantic-warning bg-opacity-20 text-semantic-warning',
    };
    return colors[category as keyof typeof colors] || 'bg-neutral-600 bg-opacity-20 text-neutral-300';
  };

  if (variant === 'compact') {
    return (
      <article 
        className={`card cursor-pointer group p-4 hover:scale-105 ${className}`}
        onClick={() => onClick?.(article)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.(article);
          }
        }}
      >
        <div className="flex space-x-4">
          {article.imageUrl && (
            <div className="flex-shrink-0">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-caption px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-xs text-neutral-400">
                {formatTimeAgo(article.publishedAt)}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-accent-teal transition-colors">
              {article.title}
            </h3>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'featured') {
    return (
      <article 
        className={`card cursor-pointer group overflow-hidden p-0 hover:scale-105 ${className}`}
        onClick={() => onClick?.(article)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick?.(article);
          }
        }}
      >
        {article.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute top-4 left-4">
              <span className={`text-caption px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <h2 className="text-h3 font-bold text-white mb-3 group-hover:text-gradient transition-colors">
            {article.title}
          </h2>
          
          <p className="text-neutral-300 mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white">{article.author}</div>
                <div className="text-xs text-neutral-400">{formatTimeAgo(article.publishedAt)}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-neutral-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{article.readTime} min read</span>
            </div>
          </div>
          
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="text-xs px-2 py-1 bg-neutral-800 text-neutral-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  // Default variant
  return (
    <article 
      className={`card cursor-pointer group overflow-hidden hover:scale-105 ${className}`}
      onClick={() => onClick?.(article)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.(article);
        }
      }}
    >
      {article.imageUrl && (
        <div className="relative h-32 overflow-hidden mb-4 -mx-6 -mt-6">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className={`text-caption px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
        </div>
      )}
      
      <div className={!article.imageUrl ? 'pt-0' : ''}>
        {!article.imageUrl && (
          <div className="mb-3">
            <span className={`text-caption px-2 py-1 rounded ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
          </div>
        )}
        
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gradient transition-colors line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-neutral-300 text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center space-x-2">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{article.readTime}m</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;