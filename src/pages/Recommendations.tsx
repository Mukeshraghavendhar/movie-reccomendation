import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, RefreshCw, Info, Heart } from "lucide-react";
import { movies, Movie, getMovieById } from "@/data/movies";
import { getRecommendations, getRecommendationsFromHistory } from "@/lib/recommendation";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Recommendations = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, likedMovies } = useAuth();
  
  const [selectedMovieId, setSelectedMovieId] = useState<string>("");
  const [recommendations, setRecommendations] = useState<{ movie: Movie; similarity: number }[]>([]);
  const [mode, setMode] = useState<"single" | "history">("single");

  // Get selected movie from navigation state
  useEffect(() => {
    if (location.state?.selectedMovie) {
      const movie = location.state.selectedMovie as Movie;
      setSelectedMovieId(movie.id.toString());
    }
  }, [location.state]);

  // Get recommendations when selection changes
  useEffect(() => {
    if (mode === "single" && selectedMovieId) {
      const recs = getRecommendations(parseInt(selectedMovieId), 5);
      setRecommendations(recs);
    } else if (mode === "history" && likedMovies.length > 0) {
      const recs = getRecommendationsFromHistory(likedMovies, 5);
      setRecommendations(recs);
    } else {
      setRecommendations([]);
    }
  }, [selectedMovieId, mode, likedMovies]);

  const selectedMovie = useMemo(() => {
    return selectedMovieId ? getMovieById(parseInt(selectedMovieId)) : undefined;
  }, [selectedMovieId]);

  const likedMovieDetails = useMemo(() => {
    return likedMovies.map(id => getMovieById(id)).filter(Boolean) as Movie[];
  }, [likedMovies]);

  const handleRefresh = () => {
    // Shuffle and get new recommendations
    if (mode === "single" && selectedMovieId) {
      const recs = getRecommendations(parseInt(selectedMovieId), 5);
      setRecommendations(recs);
    } else if (mode === "history" && likedMovies.length > 0) {
      const recs = getRecommendationsFromHistory(likedMovies, 5);
      setRecommendations(recs);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">AI-Powered Recommendations</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Get <span className="gradient-text">Recommendations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Select a movie you like, and our content-based filtering algorithm will find similar movies using TF-IDF vectorization and cosine similarity.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="glass-card p-4 mb-8 animate-slide-up">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm text-muted-foreground">Recommendation mode:</span>
              <div className="flex gap-2">
                <Button
                  variant={mode === "single" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setMode("single")}
                >
                  Single Movie
                </Button>
                <Button
                  variant={mode === "history" ? "gold" : "outline"}
                  size="sm"
                  onClick={() => setMode("history")}
                  disabled={!isAuthenticated || likedMovies.length === 0}
                >
                  <Heart className="w-4 h-4 mr-1" />
                  Based on Likes ({likedMovies.length})
                </Button>
              </div>
            </div>
          </div>

          {mode === "single" ? (
            /* Single Movie Selection */
            <div className="mb-12 animate-slide-up stagger-1">
              <h2 className="font-display text-xl font-semibold mb-4 text-foreground">
                Select a Movie
              </h2>
              <div className="flex flex-wrap gap-4 items-start">
                <Select value={selectedMovieId} onValueChange={setSelectedMovieId}>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Choose a movie you like..." />
                  </SelectTrigger>
                  <SelectContent>
                    {movies.map(movie => (
                      <SelectItem key={movie.id} value={movie.id.toString()}>
                        {movie.title} ({movie.year}) - ⭐ {movie.rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedMovie && (
                  <Button variant="outline" size="icon" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Selected Movie Preview */}
              {selectedMovie && (
                <div className="mt-6 glass-card p-6 flex flex-col md:flex-row gap-6 animate-scale-in">
                  <div className="w-32 h-48 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedMovie.poster}
                      alt={selectedMovie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <h3 className="font-display text-2xl font-semibold text-foreground">
                      {selectedMovie.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMovie.genre.map(g => (
                        <span key={g} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {g}
                        </span>
                      ))}
                    </div>
                    <p className="text-muted-foreground line-clamp-3">
                      {selectedMovie.overview}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-foreground">⭐ {selectedMovie.rating}/10</span>
                      <span className="text-muted-foreground">{selectedMovie.year}</span>
                      <span className="text-muted-foreground">{selectedMovie.director}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* History-Based Mode */
            <div className="mb-12 animate-slide-up stagger-1">
              <h2 className="font-display text-xl font-semibold mb-4 text-foreground">
                Your Liked Movies
              </h2>
              
              {!isAuthenticated ? (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    Please sign in to get recommendations based on your liked movies.
                  </p>
                  <Button variant="gold" onClick={() => navigate("/login")}>
                    Sign In
                  </Button>
                </div>
              ) : likedMovies.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    You haven't liked any movies yet. Browse movies and click the heart icon to add favorites.
                  </p>
                  <Button variant="gold" onClick={() => navigate("/movies")}>
                    Browse Movies
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {likedMovieDetails.map(movie => (
                    <div key={movie.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="text-sm text-foreground">{movie.title}</span>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Refresh
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="animate-slide-up stagger-2">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Recommended for You
                </h2>
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {recommendations.map(({ movie, similarity }, index) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    showSimilarity={similarity}
                    onSelect={(m) => setSelectedMovieId(m.id.toString())}
                    animationDelay={index * 100}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Algorithm Explanation */}
          <div className="mt-16 glass-card p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-primary" />
              <h2 className="font-display text-xl font-semibold text-foreground">
                How Recommendations Work
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">1. Feature Extraction</h3>
                <p className="text-sm text-muted-foreground">
                  Each movie's genres, overview, director, and cast are combined into a single text document representing its content.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">2. TF-IDF Vectorization</h3>
                <p className="text-sm text-muted-foreground">
                  Text is converted to numerical vectors where each term's weight reflects its importance (frequency in document vs. rarity across all documents).
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">3. Cosine Similarity</h3>
                <p className="text-sm text-muted-foreground">
                  We measure the angle between movie vectors. Smaller angles (similarity closer to 1) indicate more similar content.
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> This is a content-based filtering system. Recommendations are based purely on movie attributes, not user behavior or collaborative patterns. This approach works well for new users without requiring rating history.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Recommendations;
