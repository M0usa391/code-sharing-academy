
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code, ArrowLeft, BadgeCheck, Settings, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfileType {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  is_verified: boolean;
  is_admin: boolean;
  created_at: string;
}

interface PostType {
  id: string;
  title: string;
  content: string;
  created_at: string;
  tags: string[];
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        // If no ID provided, show current user profile
        const profileId = id || session.user.id;
        setIsOwnProfile(profileId === session.user.id);
        
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            title: 'خطأ',
            description: 'لم يتم العثور على الملف الشخصي',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }
        
        setProfile(profileData);
        
        // Fetch user's posts
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('id, title, content, created_at, tags')
          .eq('user_id', profileId)
          .order('created_at', { ascending: false });
        
        if (!postsError && postsData) {
          setPosts(postsData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'خطأ',
          description: 'حدث خطأ أثناء تحميل البيانات',
          variant: 'destructive',
        });
        navigate('/dashboard');
      }
    };
    
    fetchProfile();
  }, [id, navigate, toast]);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'تم تسجيل الخروج',
      description: 'تم تسجيل الخروج بنجاح.',
      duration: 3000,
    });
    navigate('/login');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!profile) return null;
  
  return (
    <div className="min-h-screen bg-secondary/10">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">أكاديمية Bn0mar</span>
          </Link>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 ml-1" />
            العودة للوحة التحكم
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  {profile.full_name}
                  {profile.is_verified && (
                    <BadgeCheck className="h-5 w-5 ml-1 text-blue-500" />
                  )}
                </h1>
                <p className="text-foreground/70">{profile.username}</p>
                {profile.is_admin && (
                  <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    مسؤول
                  </span>
                )}
              </div>
              
              {isOwnProfile && (
                <div className="flex space-x-2">
                  <Link
                    to="/settings"
                    className="btn-secondary flex items-center"
                  >
                    <Settings className="h-4 w-4 ml-1" />
                    الإعدادات
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 inline ml-1" />
                    تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
            
            <div className="border-t pt-6">
              <p className="text-foreground/70 text-sm">
                عضو منذ: {new Date(profile.created_at).toLocaleDateString('ar-LY')}
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-4">المنشورات</h2>
        
        {posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-foreground/70 mb-3">
                  {post.content.substring(0, 120)}
                  {post.content.length > 120 ? '...' : ''}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2">
                    {post.tags && post.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary/50 rounded-full text-xs text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags && post.tags.length > 3 && (
                      <span className="text-xs text-foreground/60">+{post.tags.length - 3}</span>
                    )}
                  </div>
                  <span className="text-xs text-foreground/60">
                    {new Date(post.created_at).toLocaleDateString('ar-LY')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-foreground/60 mb-4">لا توجد منشورات بعد</p>
            {isOwnProfile && (
              <Link to="/post/new" className="btn-primary">
                إنشاء منشور جديد
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
