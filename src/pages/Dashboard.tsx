
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Code, Plus, Filter, Search, Settings, LogOut, User, Edit, Trash2, MoreVertical, ChevronDown, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PostCard from "@/components/PostCard";

interface UserType {
  email: string;
  name: string;
  role: string;
}

interface PostType {
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
}

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<{id: string; name: string; email: string; role: string}[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  
  // Mock data for posts
  const mockPosts: PostType[] = [
    {
      id: "post1",
      title: "Implementing JWT Authentication in Node.js",
      content: "A guide on how to set up secure authentication using JSON Web Tokens in a Node.js application. This approach handles user registration, login, and protected routes.",
      author: {
        id: "user1",
        name: "Alex Johnson",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      createdAt: "2023-05-20T08:30:00Z",
      likes: 82,
      comments: 14,
      tags: ["Node.js", "Authentication", "JWT", "Security"]
    },
    {
      id: "post2",
      title: "CSS Grid vs Flexbox: When to Use Each",
      content: "A comparison of CSS Grid and Flexbox layout systems, with examples showing ideal use cases for each approach to create modern responsive layouts.",
      author: {
        id: "user2",
        name: "Maria Rodriguez",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      createdAt: "2023-05-18T14:15:00Z",
      likes: 96,
      comments: 21,
      tags: ["CSS", "Flexbox", "CSS Grid", "Frontend"]
    },
    {
      id: "post3",
      title: "Building a Custom React Hook for API Calls",
      content: "Learn how to create a reusable React hook for handling API requests, including loading states, error handling, and caching to improve performance.",
      author: {
        id: "user3",
        name: "David Kim",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      createdAt: "2023-05-15T10:45:00Z",
      likes: 124,
      comments: 28,
      tags: ["React", "Hooks", "API", "Frontend"]
    },
  ];
  
  // Mock data for users
  const mockUsers = [
    { id: "user1", name: "Alex Johnson", email: "alex@example.com", role: "user" },
    { id: "user2", name: "Maria Rodriguez", email: "maria@example.com", role: "user" },
    { id: "user3", name: "David Kim", email: "david@example.com", role: "user" },
    { id: "user4", name: "Sarah Williams", email: "sarah@example.com", role: "admin" },
    { id: "admin1", name: "Mousa Omar", email: "mousa.omar.com@gmail.com", role: "admin" }
  ];
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setIsAdmin(parsedUser.role === "admin");
    
    // Load mock data
    setPosts(mockPosts);
    setUsers(mockUsers);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    });
    navigate("/login");
  };
  
  const makeAdmin = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: "admin" } : user
    ));
    
    toast({
      title: "User promoted",
      description: "User has been promoted to admin.",
      duration: 3000,
    });
  };
  
  const removeAdmin = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: "user" } : user
    ));
    
    toast({
      title: "Admin rights removed",
      description: "Admin rights have been removed from user.",
      duration: 3000,
    });
  };
  
  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User deleted",
      description: "User has been successfully deleted.",
      duration: 3000,
    });
  };
  
  const deletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
    
    toast({
      title: "Post deleted",
      description: "Post has been successfully deleted.",
      duration: 3000,
    });
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-secondary/10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">CodeShare Academy</span>
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2 rounded-lg hover:bg-secondary p-2 transition-colors"
            >
              <span>{user.name}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Your Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors flex items-center space-x-2"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            {isAdmin ? "Admin Dashboard" : "Your Dashboard"}
          </h1>
          
          <Link to="/post/new" className="btn-primary flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Post</span>
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
                Posts
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
                  Users
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
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10 py-2"
                />
              </div>
              
              <button className="input flex items-center space-x-2 py-2">
                <Filter className="h-5 w-5 text-foreground/60" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
        
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="relative">
                  <PostCard post={post} />
                  
                  {isAdmin && (
                    <div className="absolute top-4 right-4 flex space-x-1">
                      <button
                        onClick={() => navigate(`/post/edit/${post.id}`)}
                        className="p-1.5 bg-white rounded-full shadow-sm hover:bg-secondary transition-colors"
                      >
                        <Edit className="h-4 w-4 text-foreground/70" />
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-1.5 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-foreground/70" />
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-foreground/60">No posts found.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "users" && isAdmin && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-secondary/30">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-foreground/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-border">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-foreground">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-foreground/70">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === "admin" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-green-100 text-green-800"
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.role === "admin" ? (
                          <button
                            onClick={() => removeAdmin(user.id)}
                            className="text-amber-600 hover:text-amber-900 flex items-center space-x-1"
                            disabled={user.email === "mousa.omar.com@gmail.com"}
                          >
                            <X className="h-4 w-4" />
                            <span>Remove Admin</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => makeAdmin(user.id)}
                            className="text-green-600 hover:text-green-900 flex items-center space-x-1"
                          >
                            <Check className="h-4 w-4" />
                            <span>Make Admin</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                          disabled={user.email === "mousa.omar.com@gmail.com"}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
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
