import { Film, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Film className="h-6 w-6 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold text-foreground">
                Cinema<span className="text-primary">AI</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A movie recommendation system using content-based filtering with TF-IDF and Cosine Similarity.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-muted-foreground hover:text-primary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-muted-foreground hover:text-primary transition-colors">
                  Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Technology</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React + TypeScript</li>
              <li>TF-IDF Vectorization</li>
              <li>Cosine Similarity</li>
              <li>Content-Based Filtering</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-foreground">Academic Project</h4>
            <p className="text-sm text-muted-foreground mb-4">
              This is an academic project demonstrating machine learning concepts in a web application.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 CinemaAI. Built for academic purposes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
