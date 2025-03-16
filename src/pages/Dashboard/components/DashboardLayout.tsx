
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, LogOut, User, ChevronDown, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface UserType {
  id: string;
  full_name: string;
  username: string;
  is_admin: boolean;
  is_verified: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح.",
    });
    navigate("/login");
  };

  // Pass the user to the child components
  React.useEffect(() => {
    const getUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, full_name, username, is_admin, is_verified')
        .eq('id', session.user.id)
        .single();
      
      if (profile) {
        setUser(profile);
      }
    };
    
    getUserProfile();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">أكاديمية Bn0mar</span>
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 rounded-lg hover:bg-secondary p-2 transition-colors"
            >
              <span className="flex items-center">
                {user.full_name}
                {user.is_verified && (
                  <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
                )}
              </span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
