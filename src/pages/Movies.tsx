import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { movies, getAllGenres, Movie } from "@/data/movies";
import { searchMovies } from "@/lib/recommendation";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Movies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showFilters, setShowFilters] = useState(false);

  const genres = getAllGenres();

  const filteredMovies = useMemo(() => {
    let result: Movie[] = searchQuery ? searchMovies(searchQuery) : [...movies];

    // Filter by genre
    if (selectedGenre !== "all") {
      result = result.filter(movie => 
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "year":
        result.sort((a, b) => b.year - a.year);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [searchQuery, selectedGenre, sortBy]);

  const handleMovieSelect = (movie: Movie) => {
    navigate("/recommendations", { state: { selectedMovie: movie } });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSortBy("rating");
  };

  const hasActiveFilters = searchQuery || selectedGenre !== "all" || sortBy !== "rating";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Browse <span className="gradient-text">Movies</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore our collection of {movies.length} movies. Click on any movie to get similar recommendations.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-8 animate-slide-up">
            {/* Search Bar */}
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, genre, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary" />
                )}
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="glass-card p-4 flex flex-wrap gap-4 items-center animate-scale-in">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filters:</span>
                </div>

                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre.toLowerCase()}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="year">Newest First</SelectItem>
                    <SelectItem value="title">Title A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredMovies.length}</span> movies
              {selectedGenre !== "all" && (
                <> in <span className="text-primary font-medium">{selectedGenre}</span></>
              )}
            </p>
          </div>

          {/* Movie Grid */}
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onSelect={handleMovieSelect}
                  animationDelay={Math.min(index * 50, 500)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-fade-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
                No Movies Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
