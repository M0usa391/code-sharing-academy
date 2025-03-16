
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import PostsList from "./PostsList";
import SearchBar from "./SearchBar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const DashboardContent = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          return;
        }
        
        // Get user profile information
        const { data: profile } = await supabase
          .from('profiles')
          .select('id, full_name, username, is_admin, is_verified')
          .eq('id', session.user.id)
          .single();
        
        if (!profile) {
          console.error('Profile not found');
          return;
        }
        
        setUser(profile);
        setIsAdmin(profile.is_admin);
        
        // Fetch posts
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
  }, [toast]);

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
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          {isAdmin ? "لوحة المسؤول" : "لوحة التحكم"}
        </h1>
        
        <Link to="/post/new" className="btn-primary flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>منشور جديد</span>
        </Link>
      </div>
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <PostsList 
        filteredPosts={filteredPosts} 
        user={user} 
        isAdmin={isAdmin} 
        deletePost={deletePost} 
      />
    </>
  );
};

export default DashboardContent;
