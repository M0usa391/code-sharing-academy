
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, Plus, Search, LogOut, User, Edit, Trash2, ChevronDown, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserType {
  id: string;
  full_name: string;
  username: string;
  is_admin: boolean;
  is_verified: boolean;
}

interface PostType {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
    is_verified?: boolean;
  };
  createdAt: string;
  tags: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/login");
          return;
        }
        
        // Get user profile information - simplified query
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, full_name, username, is_admin, is_verified')
          .eq('id', session.user.id)
          .single();
        
        if (!profile) {
          console.error('Profile not found');
          navigate("/login");
          return;
        }
        
        setUser(profile);
        setIsAdmin(profile.is_admin);
        
        // Fetch posts with simplified query
        const { data: postsData } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            created_at,
            tags,
            user_id,
            profiles:profiles(id, full_name, avatar_url, is_verified)
          `)
          .order('created_at', { ascending: false })
          .limit(10);
        
        if (postsData) {
          const formattedPosts = postsData.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            author: {
              id: post.profiles.id,
              name: post.profiles.full_name,
              avatarUrl: post.profiles.avatar_url || 'https://via.placeholder.com/150',
              is_verified: post.profiles.is_verified
            },
            createdAt: post.created_at,
            tags: post.tags || []
          }));
          
          setPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "حدث خطأ",
          description: "فشل في تحميل البيانات، يرجى المحاولة مرة أخرى.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح.",
    });
    navigate("/login");
  };
  
  const deletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      setPosts(posts.filter(post => post.id !== postId));
      
      toast({
        title: "تم حذف المنشور",
        description: "تم حذف المنشور بنجاح.",
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية حذف المنشور.",
        variant: "destructive",
      });
    }
  };
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header - Simplified */}
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {isAdmin ? "لوحة المسؤول" : "لوحة التحكم"}
          </h1>
          
          <Link to="/post/new" className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>منشور جديد</span>
          </Link>
        </div>
        
        {/* Simplified search bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("posts")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === "posts"
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/70 hover:bg-secondary transition-colors"
                }`}
              >
                المنشورات
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="بحث في المنشورات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input py-2"
              />
            </div>
          </div>
        </div>
        
        {/* Posts List - Simplified rendering */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="relative">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <div className="font-medium text-foreground flex items-center">
                          {post.author.name}
                          {post.author.is_verified && (
                            <BadgeCheck className="ml-1 h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <div className="text-foreground/60 text-sm">
                          {new Date(post.createdAt).toLocaleDateString('ar-LY')}
                        </div>
                      </div>
                    </div>
                    
                    {(isAdmin || user.id === post.author.id) && (
                      <div className="flex space-x-1">
                        <button
                          onClick={() => navigate(`/post/edit/${post.id}`)}
                          className="p-1.5 bg-secondary/50 rounded-full hover:bg-secondary transition-colors"
                        >
                          <Edit className="h-4 w-4 text-foreground/70" />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 bg-secondary/50 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4 text-foreground/70" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-foreground/80 mb-4">{post.content.substring(0, 150)}...</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/50 rounded-full text-xs text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link to={`/post/${post.id}`} className="text-primary hover:text-primary/80">
                    اقرأ المزيد
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-foreground/60">لا توجد منشورات.</p>
              <Link to="/post/new" className="mt-4 btn-primary inline-flex items-center">
                <Plus className="h-5 w-5 mr-1" />
                إنشاء منشور جديد
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
