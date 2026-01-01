import React, { createContext, useContext, useState, useEffect } from "react";

// Mock user interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  likedMovies: number[];
  toggleLikeMovie: (movieId: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock user database for demo purposes
const mockUsers: { email: string; password: string; name: string }[] = [
  { email: "demo@example.com", password: "demo123", name: "Demo User" }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("movieapp_user");
    const savedLikes = localStorage.getItem("movieapp_likes");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedLikes) {
      setLikedMovies(JSON.parse(savedLikes));
    }
  }, []);

  // Persist liked movies
  useEffect(() => {
    if (user) {
      localStorage.setItem("movieapp_likes", JSON.stringify(likedMovies));
    }
  }, [likedMovies, user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const newUser: User = {
        id: crypto.randomUUID(),
        name: foundUser.name,
        email: foundUser.email
      };
      setUser(newUser);
      localStorage.setItem("movieapp_user", JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return false;
    }
    
    // Add new user to mock database
    mockUsers.push({ email, password, name });
    
    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email
    };
    
    setUser(newUser);
    localStorage.setItem("movieapp_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setLikedMovies([]);
    localStorage.removeItem("movieapp_user");
    localStorage.removeItem("movieapp_likes");
  };

  const toggleLikeMovie = (movieId: number) => {
    setLikedMovies(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      }
      return [...prev, movieId];
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        likedMovies,
        toggleLikeMovie
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
