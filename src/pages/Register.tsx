
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, Eye, EyeOff, User, Lock, Mail, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({
        email,
        name,
        role: "user"
      }));
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
        duration: 3000,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: "" };
    
    let strength = 0;
    
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthTexts = ["Weak", "Fair", "Good", "Strong"];
    
    return {
      strength,
      text: strengthTexts[strength - 1] || ""
    };
  };

  const { strength, text } = getPasswordStrength();
  
  const getPasswordStrengthColor = () => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
    return colors[strength - 1] || "";
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
            <h2 className="text-3xl font-bold">Create an account</h2>
            <p className="text-foreground/70 mt-2">
              Join the CodeShare Academy community
            </p>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input pl-10 w-full"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-foreground/40" />
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
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 pr-10 w-full"
                  placeholder="Create a password"
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
              
              {password && (
                <div className="mt-2">
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(strength / 4) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-foreground/60">
                    Password strength: {text}
                  </p>
                </div>
              )}
              
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-foreground/60">
                <div className="flex items-center space-x-1">
                  <div className={`h-3 w-3 rounded-full flex items-center justify-center ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {password.length >= 8 && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>8+ characters</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`h-3 w-3 rounded-full flex items-center justify-center ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {/[A-Z]/.test(password) && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>Uppercase letter</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`h-3 w-3 rounded-full flex items-center justify-center ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {/[0-9]/.test(password) && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>Number</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className={`h-3 w-3 rounded-full flex items-center justify-center ${/[^A-Za-z0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}>
                    {/[^A-Za-z0-9]/.test(password) && <Check className="h-2 w-2 text-white" />}
                  </div>
                  <span>Special character</span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input pl-10 pr-10 w-full"
                  placeholder="Confirm your password"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-foreground/40 hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
              )}
            </div>
            
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-foreground/70">
                I agree to the{" "}
                <a href="#" className="text-primary hover:text-primary/80">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </a>
              </label>
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
                {loading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/70">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:text-primary/80">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
