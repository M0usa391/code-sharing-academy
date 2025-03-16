
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Code, ArrowLeft, BadgeCheck, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PostType {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  author: {
    id: string;
    full_name: string;
    avatar_url: string;
    is_verified: boolean;
  };
}

interface UserType {
  id: string;
  is_admin: boolean;
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        // Fetch current user profile
        const { data: userProfile, error: userError } = await supabase
          .from('profiles')
          .select('id, is_admin')
          .eq('id', session.user.id)
          .single();
        
        if (userError) {
          console.error('Error fetching user profile:', userError);
          toast({
            title: 'خطأ',
            description: 'فشل في تحميل البيانات الشخصية',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }
        
        setCurrentUser(userProfile);
        
        // Fetch post with author info
        const { data: postData, error: postError } = await supabase
          .from('posts')
          .select(`
            id,
            title,
            content,
            user_id,
            created_at,
            updated_at,
            tags,
            profiles:user_id (id, full_name, avatar_url, is_verified)
          `)
          .eq('id', id)
          .single();
        
        if (postError) {
          console.error('Error fetching post:', postError);
          toast({
            title: 'خطأ',
            description: 'لم يتم العثور على المنشور',
            variant: 'destructive',
          });
          navigate('/dashboard');
          return;
        }
        
        setPost({
          ...postData,
          author: {
            id: postData.profiles.id,
            full_name: postData.profiles.full_name,
            avatar_url: postData.profiles.avatar_url || 'https://via.placeholder.com/150',
            is_verified: postData.profiles.is_verified
          }
        });
        
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
    
    fetchPost();
  }, [id, navigate, toast]);
  
  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'تم الحذف',
        description: 'تم حذف المنشور بنجاح',
      });
      
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'خطأ',
        description: error.message || 'فشل في حذف المنشور',
        variant: 'destructive',
      });
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!post) return null;
  
  const canEdit = currentUser && (currentUser.is_admin || currentUser.id === post.user_id);
  
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
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div>
                  <h3 className="font-medium text-foreground flex items-center">
                    {post.author.full_name}
                    {post.author.is_verified && (
                      <BadgeCheck className="h-4 w-4 ml-1 text-blue-500" />
                    )}
                  </h3>
                  <div className="text-foreground/60 text-sm">
                    {new Date(post.created_at).toLocaleDateString('ar-LY')}
                    {post.created_at !== post.updated_at && ' (تم التعديل)'}
                  </div>
                </div>
              </div>
              
              {canEdit && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/post/edit/${post.id}`)}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <Edit className="h-5 w-5 text-foreground/70" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-2 rounded-lg bg-secondary/50 hover:bg-red-100 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5 text-foreground/70" />
                  </button>
                </div>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none mb-6">
              <p>{post.content}</p>
            </div>
            
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/50 rounded-full text-sm text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Post;
