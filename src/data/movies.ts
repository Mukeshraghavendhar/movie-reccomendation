// Sample movie dataset for the recommendation system
export interface Movie {
  id: number;
  title: string;
  genre: string[];
  overview: string;
  rating: number;
  year: number;
  poster: string;
  director: string;
  cast: string[];
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: ["Drama", "Crime"],
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. A tale of hope and perseverance in the darkest of places.",
    rating: 9.3,
    year: 1994,
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman"]
  },
  {
    id: 2,
    title: "The Godfather",
    genre: ["Crime", "Drama"],
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son. A masterpiece of American cinema.",
    rating: 9.2,
    year: 1972,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: ["Action", "Crime", "Drama"],
    overview: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    rating: 9.0,
    year: 2008,
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=600&fit=crop",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"]
  },
  {
    id: 4,
    title: "Inception",
    genre: ["Action", "Sci-Fi", "Thriller"],
    overview: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    rating: 8.8,
    year: 2010,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"]
  },
  {
    id: 5,
    title: "Pulp Fiction",
    genre: ["Crime", "Drama"],
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption. Tarantino's masterpiece of nonlinear storytelling.",
    rating: 8.9,
    year: 1994,
    poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=600&fit=crop",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: 6,
    title: "Interstellar",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival. An epic journey through space and time.",
    rating: 8.6,
    year: 2014,
    poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=600&fit=crop",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"]
  },
  {
    id: 7,
    title: "The Matrix",
    genre: ["Action", "Sci-Fi"],
    overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    rating: 8.7,
    year: 1999,
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne"]
  },
  {
    id: 8,
    title: "Forrest Gump",
    genre: ["Drama", "Romance"],
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    year: 1994,
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright"]
  },
  {
    id: 9,
    title: "Fight Club",
    genre: ["Drama", "Thriller"],
    overview: "An insomniac office worker and a soap salesman build a global organization to help vent male aggression. A mind-bending psychological thriller.",
    rating: 8.8,
    year: 1999,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton"]
  },
  {
    id: 10,
    title: "Goodfellas",
    genre: ["Biography", "Crime", "Drama"],
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen and his mob partners. A true crime epic.",
    rating: 8.7,
    year: 1990,
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
  },
  {
    id: 11,
    title: "The Silence of the Lambs",
    genre: ["Crime", "Drama", "Thriller"],
    overview: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to catch another serial killer. Psychological horror at its finest.",
    rating: 8.6,
    year: 1991,
    poster: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=400&h=600&fit=crop",
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins"]
  },
  {
    id: 12,
    title: "Gladiator",
    genre: ["Action", "Adventure", "Drama"],
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery. Epic historical drama.",
    rating: 8.5,
    year: 2000,
    poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=400&h=600&fit=crop",
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix"]
  },
  {
    id: 13,
    title: "The Prestige",
    genre: ["Drama", "Mystery", "Sci-Fi"],
    overview: "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have. A tale of obsession and rivalry.",
    rating: 8.5,
    year: 2006,
    poster: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Hugh Jackman"]
  },
  {
    id: 14,
    title: "Saving Private Ryan",
    genre: ["Drama", "War"],
    overview: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action. War drama masterpiece.",
    rating: 8.6,
    year: 1998,
    poster: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop",
    director: "Steven Spielberg",
    cast: ["Tom Hanks", "Matt Damon"]
  },
  {
    id: 15,
    title: "The Green Mile",
    genre: ["Crime", "Drama", "Fantasy"],
    overview: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder who has a mysterious gift. A supernatural drama of hope and redemption.",
    rating: 8.6,
    year: 1999,
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    director: "Frank Darabont",
    cast: ["Tom Hanks", "Michael Clarke Duncan"]
  },
  {
    id: 16,
    title: "Blade Runner 2049",
    genre: ["Action", "Drama", "Sci-Fi"],
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard. A visually stunning sci-fi sequel.",
    rating: 8.0,
    year: 2017,
    poster: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford"]
  },
  {
    id: 17,
    title: "The Departed",
    genre: ["Crime", "Drama", "Thriller"],
    overview: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in Boston. Scorsese's crime masterpiece.",
    rating: 8.5,
    year: 2006,
    poster: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=600&fit=crop",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
  },
  {
    id: 18,
    title: "Whiplash",
    genre: ["Drama", "Music"],
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    rating: 8.5,
    year: 2014,
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons"]
  },
  {
    id: 19,
    title: "Parasite",
    genre: ["Comedy", "Drama", "Thriller"],
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan. A genre-defying masterpiece.",
    rating: 8.5,
    year: 2019,
    poster: "https://images.unsplash.com/photo-1460881680093-7c8e5fbd3d1f?w=400&h=600&fit=crop",
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun"]
  },
  {
    id: 20,
    title: "The Lord of the Rings: The Fellowship",
    genre: ["Adventure", "Drama", "Fantasy"],
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth. Epic fantasy adventure.",
    rating: 8.8,
    year: 2001,
    poster: "https://images.unsplash.com/photo-1506466010722-395aa2bef877?w=400&h=600&fit=crop",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"]
  }
];

// Get all unique genres from the movie dataset
export const getAllGenres = (): string[] => {
  const genreSet = new Set<string>();
  movies.forEach(movie => {
    movie.genre.forEach(g => genreSet.add(g));
  });
  return Array.from(genreSet).sort();
};

// Get movie by ID
export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};
