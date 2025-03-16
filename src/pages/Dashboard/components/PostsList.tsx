import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, BadgeCheck, Plus } from "lucide-react";
import PostCard from "./PostCard";

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

interface PostsListProps {
  filteredPosts: PostType[];
  user: UserType;
  isAdmin: boolean;
  deletePost: (postId: string) => Promise<void>;
}

const PostsList: React.FC<PostsListProps> = ({ filteredPosts, user, isAdmin, deletePost }) => {
  const navigate = useNavigate();
  
  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <p className="text-foreground/60">لا توجد منشورات.</p>
        <Link to="/post/new" className="mt-4 btn-primary inline-flex items-center">
          <Plus className="h-5 w-5 mr-1" />
          إنشاء منشور جديد
        </Link>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {filteredPosts.map((post) => (
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
      ))}
    </div>
  );
};

export default PostsList;
