
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Code, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary/50 py-12 mt-16">
      <div className="container-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">CodeShare Academy</span>
            </div>
            <p className="text-foreground/70 text-sm max-w-xs">
              A community platform for developers to share code snippets, tips, and collaborate on programming challenges.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" className="text-foreground/60 hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-foreground/60 hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" className="text-foreground/60 hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/explore" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Explore Code
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Coding Challenges
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Community Events
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/forum" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Forum
                </Link>
              </li>
              <li>
                <Link to="/discord" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Discord
                </Link>
              </li>
              <li>
                <Link to="/contributors" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Contributors
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Guidelines
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-foreground/60 text-sm">
            &copy; {currentYear} CodeShare Academy. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link to="/terms" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/cookies" className="text-foreground/60 hover:text-foreground transition-colors text-sm">
              Cookies
            </Link>
          </div>
          
          <div className="text-foreground/60 text-sm flex items-center">
            <span>Made with</span>
            <Heart className="inline h-4 w-4 mx-1 text-red-500" />
            <span>by CodeShare Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
