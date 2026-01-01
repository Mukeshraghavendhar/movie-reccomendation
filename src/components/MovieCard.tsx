import { useState } from "react";
import { Heart, Star, Play } from "lucide-react";
import { Movie } from "@/data/movies";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
  showSimilarity?: number;
  animationDelay?: number;
}

const MovieCard = ({ movie, onSelect, showSimilarity, animationDelay = 0 }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isAuthenticated, likedMovies, toggleLikeMovie } = useAuth();
  const navigate = useNavigate();
  const isLiked = likedMovies.includes(movie.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    toggleLikeMovie(movie.id);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(movie);
    }
  };

  // Fallback gradient for failed images
  const fallbackStyle = imageError
    ? {
        background: `linear-gradient(135deg, hsl(222 47% 15%), hsl(222 47% 8%))`,
      }
    : {};

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-card border border-border/30 hover-lift cursor-pointer animate-slide-up opacity-0"
      style={{ animationDelay: `${animationDelay}ms`, animationFillMode: "forwards" }}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-secondary animate-pulse" />
        )}
        
        {!imageError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={fallbackStyle}
          >
            <span className="text-4xl font-display text-primary/50">
              {movie.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 movie-card-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLiked
              ? "bg-primary text-primary-foreground"
              : "bg-background/50 text-foreground hover:bg-background/70"
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Similarity Badge */}
        {showSimilarity !== undefined && (
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/90 backdrop-blur-sm">
            <span className="text-xs font-semibold text-primary-foreground">
              {Math.round(showSimilarity * 100)}% Match
            </span>
          </div>
        )}

        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="gold" size="icon" className="w-14 h-14 rounded-full">
            <Play className="w-6 h-6 fill-current" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground" />
          <span className="line-clamp-1">{movie.genre.slice(0, 2).join(", ")}</span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-medium text-foreground">{movie.rating}</span>
          <span className="text-sm text-muted-foreground">/10</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
