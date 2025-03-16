
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, Plus, Filter, Search, Settings, LogOut, User, Edit, Trash2, MoreVertical, ChevronDown, Check, X, BadgeCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PostCard from "@/components/PostCard";
import { supabase } from "@/integrations/supabase/client";

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
  likes: number;
  comments: number;
  tags: string[];
  codeSnippet?: string;
  language?: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<{id: string; full_name: string; username: string; is_admin: boolean; is_verified: boolean}[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkSession = async () => {
      setLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }
      
      // Get user profile information
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (error || !profile) {
        console.error('Error fetching profile:', error);
        navigate("/login");
        return;
      }
      
      setUser({
        id: profile.id,
        full_name: profile.full_name,
        username: profile.username,
        is_admin: profile.is_admin,
        is_verified: profile.is_verified
      });
      
      setIsAdmin(profile.is_admin);
      
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          title,
          content,
          created_at,
          tags,
          profiles:user_id (id, full_name, avatar_url, is_verified)
        `)
        .order('created_at', { ascending: false });
      
      if (!postsError && postsData) {
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
          likes: 0, // We'll implement this later
          comments: 0, // We'll implement this later
          tags: post.tags || []
        }));
        
        setPosts(formattedPosts);
      }
      
      // If admin, fetch users
      if (profile.is_admin) {
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*');
        
        if (!usersError && usersData) {
          setUsers(usersData);
        }
      }
      
      setLoading(false);
    };
    
    checkSession();
  }, [navigate]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل الخروج بنجاح.",
      duration: 3000,
    });
    navigate("/login");
  };
  
  const toggleVerification = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_verified: !currentStatus })
        .eq('id', userId);
      
      if (error) throw error;
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_verified: !currentStatus } : user
      ));
      
      toast({
        title: currentStatus ? "تم إلغاء التوثيق" : "تم التوثيق",
        description: currentStatus ? "تم إلغاء توثيق المستخدم بنجاح." : "تم توثيق المستخدم بنجاح.",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية تغيير حالة التوثيق.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);
      
      if (error) throw error;
      
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_admin: !currentStatus } : user
      ));
      
      toast({
        title: currentStatus ? "تم إزالة صلاحيات المسؤول" : "تمت الترقية إلى مسؤول",
        description: currentStatus ? "تم إزالة صلاحيات المسؤول من المستخدم." : "تمت ترقية المستخدم إلى مسؤول.",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية تغيير صلاحيات المستخدم.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const deleteUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (error) throw error;
      
      setUsers(users.filter(user => user.id !== userId));
      
      toast({
        title: "تم حذف المستخدم",
        description: "تم حذف المستخدم بنجاح.",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية حذف المستخدم.",
        variant: "destructive",
        duration: 3000,
      });
    }
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
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: error.message || "فشلت عملية حذف المنشور.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
    <div className="min-h-screen flex flex-col bg-secondary/10">
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
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>الإعدادات</span>
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
              
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    activeTab === "users"
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground/70 hover:bg-secondary transition-colors"
                  }`}
                >
                  المستخدمين
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type="text"
                  placeholder={`بحث في ${activeTab === "posts" ? "المنشورات" : "المستخدمين"}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 py-2"
                />
              </div>
              
              <button className="input flex items-center space-x-2 py-2">
                <Filter className="h-5 w-5 text-foreground/60" />
                <span>تصفية</span>
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="relative">
                  <div className="card p-6">
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
        )}
        
        {activeTab === "users" && isAdmin && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    الاسم
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    البريد الإلكتروني
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    الصلاحيات
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-foreground flex items-center">
                        {user.full_name}
                        {user.is_verified && (
                          <BadgeCheck className="mr-1 h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-foreground/70">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.is_admin 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {user.is_admin ? "مسؤول" : "مستخدم"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleVerification(user.id, user.is_verified)}
                          className={`px-2 py-1 rounded text-xs ${
                            user.is_verified 
                              ? "bg-amber-100 text-amber-800" 
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.is_verified ? "إلغاء التوثيق" : "توثيق"}
                        </button>
                        
                        <button
                          onClick={() => toggleAdmin(user.id, user.is_admin)}
                          className={`px-2 py-1 rounded text-xs ${
                            user.is_admin 
                              ? "bg-orange-100 text-orange-800" 
                              : "bg-green-100 text-green-800"
                          }`}
                          disabled={user.username === "mousa.omar.com@gmail.com"}
                        >
                          {user.is_admin ? "إلغاء المسؤول" : "ترقية لمسؤول"}
                        </button>
                        
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="px-2 py-1 rounded text-xs bg-red-100 text-red-800"
                          disabled={user.username === "mousa.omar.com@gmail.com"}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
