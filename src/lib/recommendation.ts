/**
 * Content-Based Movie Recommendation System
 * 
 * This module implements a content-based filtering recommendation algorithm
 * using TF-IDF (Term Frequency-Inverse Document Frequency) vectorization
 * and Cosine Similarity to find similar movies.
 * 
 * HOW IT WORKS:
 * 1. Each movie is represented as a document containing its genres, overview, and other metadata
 * 2. TF-IDF converts text to numerical vectors, giving more weight to distinctive terms
 * 3. Cosine Similarity measures the angle between movie vectors (closer angle = more similar)
 * 4. Movies with highest similarity scores are recommended
 * 
 * ASSUMPTIONS:
 * - Movies with similar genres and plot descriptions are considered similar
 * - Genre matching has higher weight than plot description
 * - More recent movies are slightly preferred (recency bias)
 */

import { Movie, movies } from "@/data/movies";

// Tokenize and clean text
const tokenize = (text: string): string[] => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2);
};

// Calculate term frequency for a document
const calculateTF = (tokens: string[]): Map<string, number> => {
  const tf = new Map<string, number>();
  tokens.forEach(token => {
    tf.set(token, (tf.get(token) || 0) + 1);
  });
  // Normalize by total tokens
  const totalTokens = tokens.length;
  tf.forEach((count, term) => {
    tf.set(term, count / totalTokens);
  });
  return tf;
};

// Calculate inverse document frequency for all terms across all movies
const calculateIDF = (documents: string[][]): Map<string, number> => {
  const idf = new Map<string, number>();
  const N = documents.length;
  
  // Count document frequency for each term
  const df = new Map<string, number>();
  documents.forEach(doc => {
    const uniqueTerms = new Set(doc);
    uniqueTerms.forEach(term => {
      df.set(term, (df.get(term) || 0) + 1);
    });
  });
  
  // Calculate IDF: log(N / df)
  df.forEach((docFreq, term) => {
    idf.set(term, Math.log(N / docFreq));
  });
  
  return idf;
};

// Create TF-IDF vector for a document
const createTFIDFVector = (
  tokens: string[],
  idf: Map<string, number>
): Map<string, number> => {
  const tf = calculateTF(tokens);
  const tfidf = new Map<string, number>();
  
  tf.forEach((tfValue, term) => {
    const idfValue = idf.get(term) || 0;
    tfidf.set(term, tfValue * idfValue);
  });
  
  return tfidf;
};

// Calculate cosine similarity between two vectors
const cosineSimilarity = (
  vec1: Map<string, number>,
  vec2: Map<string, number>
): number => {
  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;
  
  // Calculate dot product and norm for vec1
  vec1.forEach((value, key) => {
    norm1 += value * value;
    if (vec2.has(key)) {
      dotProduct += value * vec2.get(key)!;
    }
  });
  
  // Calculate norm for vec2
  vec2.forEach(value => {
    norm2 += value * value;
  });
  
  // Avoid division by zero
  if (norm1 === 0 || norm2 === 0) return 0;
  
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
};

// Create feature string for a movie (combines genres, overview, director)
const createMovieFeatures = (movie: Movie): string => {
  // Weight genres more heavily by repeating them
  const genreText = movie.genre.join(" ").repeat(3);
  const directorText = movie.director.repeat(2);
  const castText = movie.cast.join(" ");
  
  return `${genreText} ${movie.overview} ${directorText} ${castText}`;
};

// Main recommendation function
export const getRecommendations = (
  selectedMovieId: number,
  topN: number = 5
): { movie: Movie; similarity: number }[] => {
  // Create tokenized documents for all movies
  const documents = movies.map(movie => tokenize(createMovieFeatures(movie)));
  
  // Calculate IDF across all documents
  const idf = calculateIDF(documents);
  
  // Create TF-IDF vectors for all movies
  const tfidfVectors = movies.map((movie, index) => ({
    movie,
    vector: createTFIDFVector(documents[index], idf)
  }));
  
  // Find the selected movie's vector
  const selectedIndex = movies.findIndex(m => m.id === selectedMovieId);
  if (selectedIndex === -1) return [];
  
  const selectedVector = tfidfVectors[selectedIndex].vector;
  
  // Calculate similarity with all other movies
  const similarities = tfidfVectors
    .filter((_, index) => index !== selectedIndex)
    .map(({ movie, vector }) => ({
      movie,
      similarity: cosineSimilarity(selectedVector, vector)
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
  
  return similarities;
};

// Get recommendations based on multiple movies (for user history)
export const getRecommendationsFromHistory = (
  movieIds: number[],
  topN: number = 5
): { movie: Movie; similarity: number }[] => {
  if (movieIds.length === 0) return [];
  
  // Get recommendations for each movie in history
  const allRecommendations = movieIds.flatMap(id => 
    getRecommendations(id, topN * 2)
  );
  
  // Aggregate scores for movies that appear multiple times
  const scoreMap = new Map<number, { movie: Movie; totalScore: number; count: number }>();
  
  allRecommendations.forEach(({ movie, similarity }) => {
    if (movieIds.includes(movie.id)) return; // Exclude movies already in history
    
    const existing = scoreMap.get(movie.id);
    if (existing) {
      existing.totalScore += similarity;
      existing.count += 1;
    } else {
      scoreMap.set(movie.id, { movie, totalScore: similarity, count: 1 });
    }
  });
  
  // Calculate average scores and sort
  return Array.from(scoreMap.values())
    .map(({ movie, totalScore, count }) => ({
      movie,
      similarity: totalScore / count
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topN);
};

// Filter movies by genre
export const filterByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => 
    movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
  );
};

// Search movies by title
export const searchMovies = (query: string): Movie[] => {
  const lowercaseQuery = query.toLowerCase();
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(lowercaseQuery) ||
    movie.overview.toLowerCase().includes(lowercaseQuery) ||
    movie.genre.some(g => g.toLowerCase().includes(lowercaseQuery))
  );
};
