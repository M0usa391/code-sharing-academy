
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, Eye, EyeOff, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll simply check if email is admin email
      if (email === "mousa.omar.com@gmail.com") {
        // Save user info to localStorage
        localStorage.setItem("user", JSON.stringify({
          email,
          name: "Mousa Omar",
          role: "admin"
        }));
        
        toast({
          title: "Welcome back, Admin!",
          description: "You have successfully logged in.",
          duration: 3000,
        });
      } else {
        // Save regular user
        localStorage.setItem("user", JSON.stringify({
          email,
          name: email.split("@")[0],
          role: "user"
        }));
        
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
          duration: 3000,
        });
      }
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">CodeShare Academy</span>
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="glass max-w-md w-full p-8 rounded-2xl shadow-xl animate-scale">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Welcome back</h2>
            <p className="text-foreground/70 mt-2">
              Sign in to continue to CodeShare Academy
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10 w-full"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-foreground/40 hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary/80">
                  Forgot your password?
                </a>
              </div>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/70">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:text-primary/80">
                Sign up
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-foreground/60">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-white text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-white text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.823.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
              
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm bg-white text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22.54C6.47 22.54 2 18.07 2 12.54C2 7.01 6.47 2.54 12 2.54C17.53 2.54 22 7.01 22 12.54C22 18.07 17.53 22.54 12 22.54ZM12 1.04C5.65 1.04 0.5 6.19 0.5 12.54C0.5 18.89 5.65 24.04 12 24.04C18.35 24.04 23.5 18.89 23.5 12.54C23.5 6.19 18.35 1.04 12 1.04Z" />
                  <path d="M8.97 17.54L8.97 7.54L18.97 12.54L8.97 17.54Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
