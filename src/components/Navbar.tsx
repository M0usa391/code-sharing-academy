
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Code, Search } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    // Check if user is logged in (this would be replaced with actual auth check)
    const checkAuth = async () => {
      // Placeholder for auth check
      const user = localStorage.getItem("user");
      setIsLoggedIn(!!user);
    };
    
    checkAuth();
  }, []);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-content">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <Code className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">CodeShare Academy</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${isActive("/") ? "nav-link-active" : ""}`}>
              Home
            </Link>
            <Link to="/explore" className={`nav-link ${isActive("/explore") ? "nav-link-active" : ""}`}>
              Explore
            </Link>
            <Link to="/resources" className={`nav-link ${isActive("/resources") ? "nav-link-active" : ""}`}>
              Resources
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about") ? "nav-link-active" : ""}`}>
              About
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="flex items-center text-foreground/80 hover:text-foreground">
              <Search className="h-5 w-5" />
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="btn-secondary py-2">
                  Dashboard
                </Link>
                <Link to="/profile" className="relative group">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="btn-secondary py-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary py-2">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-secondary/80 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ top: "60px" }}
      >
        <div className="container mx-auto px-4 pt-4 pb-16 h-full flex flex-col">
          <nav className="flex flex-col space-y-4 mb-8">
            <Link 
              to="/" 
              className={`text-lg p-3 rounded-lg ${isActive("/") ? "bg-primary/10 text-primary" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/explore" 
              className={`text-lg p-3 rounded-lg ${isActive("/explore") ? "bg-primary/10 text-primary" : ""}`}
              onClick={closeMenu}
            >
              Explore
            </Link>
            <Link 
              to="/resources" 
              className={`text-lg p-3 rounded-lg ${isActive("/resources") ? "bg-primary/10 text-primary" : ""}`}
              onClick={closeMenu}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className={`text-lg p-3 rounded-lg ${isActive("/about") ? "bg-primary/10 text-primary" : ""}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="btn-secondary"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/80"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button 
                  className="flex items-center space-x-3 p-3 rounded-lg text-destructive hover:bg-destructive/10"
                  onClick={closeMenu}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn-secondary"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
