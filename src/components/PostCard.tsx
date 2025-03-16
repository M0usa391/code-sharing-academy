
import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Bookmark, Share2, MoreHorizontal } from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatarUrl: string;
    };
    createdAt: string;
    likes: number;
    comments: number;
    tags: string[];
    codeSnippet?: string;
    language?: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="card hover:shadow-md transition-all duration-300 animate-scale">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.author.id}`}>
              <img 
                src={post.author.avatarUrl} 
                alt={post.author.name}
                className="h-10 w-10 rounded-full object-cover border border-border"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author.name)}&background=3b82f6&color=fff`;
                }}
              />
            </Link>
            <div>
              <Link to={`/profile/${post.author.id}`} className="font-medium hover:text-primary transition-colors">
                {post.author.name}
              </Link>
              <p className="text-xs text-foreground/60">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <button className="text-foreground/60 hover:text-foreground transition-colors rounded-full p-1 hover:bg-secondary">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
        
        <Link to={`/post/${post.id}`} className="block group">
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-foreground/70 mb-4 line-clamp-2">
            {post.content}
          </p>
          
          {post.codeSnippet && (
            <div className="bg-secondary rounded-lg p-4 mb-4 font-mono text-sm overflow-x-auto">
              <pre>
                <code>
                  {post.codeSnippet}
                </code>
              </pre>
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </Link>
        
        <div className="flex justify-between items-center pt-2 border-t border-border/50">
          <div className="flex space-x-4">
            <button className="flex items-center space-x-1 text-foreground/60 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">{post.likes}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-foreground/60 hover:text-primary transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.comments}</span>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="text-foreground/60 hover:text-primary transition-colors p-1 rounded-full hover:bg-secondary">
              <Bookmark className="h-5 w-5" />
            </button>
            
            <button className="text-foreground/60 hover:text-primary transition-colors p-1 rounded-full hover:bg-secondary">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
