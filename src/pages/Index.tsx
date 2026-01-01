import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Film, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { movies } from "@/data/movies";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  const featuredMovies = movies.slice(0, 4);

  const features = [
    {
      icon: Brain,
      title: "Smart Recommendations",
      description: "Our AI analyzes movie content using TF-IDF vectorization to find your perfect match."
    },
    {
      icon: Sparkles,
      title: "Content-Based Filtering",
      description: "Recommendations based on genres, plot descriptions, and movie characteristics."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get personalized movie suggestions in real-time with our optimized algorithm."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">Powered by Machine Learning</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight animate-slide-up">
              Discover Your Next
              <span className="block gradient-text">Favorite Movie</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-up stagger-1">
              Experience intelligent movie recommendations using advanced content-based filtering with TF-IDF and Cosine Similarity algorithms.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => navigate("/movies")}
                className="group"
              >
                Browse Movies
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="glass" 
                size="xl"
                onClick={() => navigate("/recommendations")}
              >
                <Film className="w-5 h-5" />
                Get Recommendations
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 animate-fade-in stagger-3">
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">{movies.length}+</p>
                <p className="text-sm text-muted-foreground">Movies</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">TF-IDF</p>
                <p className="text-sm text-muted-foreground">Vectorization</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-display font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Accuracy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our recommendation system uses sophisticated machine learning algorithms to analyze movie content and find similar films.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card p-8 text-center hover-lift animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
                Featured <span className="gradient-text">Movies</span>
              </h2>
              <p className="text-muted-foreground">
                Explore our curated collection of top-rated films
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate("/movies")}
              className="hidden sm:flex"
            >
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={() => navigate("/recommendations", { state: { selectedMovie: movie } })}
                animationDelay={index * 100}
              />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" onClick={() => navigate("/movies")}>
              View All Movies
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Algorithm Explanation Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
              The <span className="gradient-text">Algorithm</span> Behind It
            </h2>

            <div className="glass-card p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-primary">
                  1. TF-IDF Vectorization
                </h3>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Term Frequency-Inverse Document Frequency</strong> converts movie descriptions into numerical vectors. It weighs words based on their importance - common words get lower weights, while distinctive terms get higher weights. This creates a unique "fingerprint" for each movie.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-primary">
                  2. Cosine Similarity
                </h3>
                <p className="text-muted-foreground">
                  Once movies are represented as vectors, we calculate the <strong className="text-foreground">cosine of the angle</strong> between them. Vectors pointing in similar directions (angle close to 0°) have high similarity scores. This mathematical approach effectively measures content similarity.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-primary">
                  3. Content-Based Filtering
                </h3>
                <p className="text-muted-foreground">
                  Our system analyzes movie attributes like <strong className="text-foreground">genre, plot overview, director, and cast</strong>. When you select a movie you like, we find others with similar content profiles. This approach doesn't require user rating history - perfect for new users!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Ready to Find Your Next
              <span className="block gradient-text">Movie Match?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start exploring our collection and get personalized recommendations powered by AI.
            </p>
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/register")}
              className="group pulse-glow"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
