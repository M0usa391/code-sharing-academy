
import React from "react";
import { Link } from "react-router-dom";
import PostCard from "./PostCard";
import { ArrowRight } from "lucide-react";

// Sample data for featured posts
const featuredPosts = [
  {
    id: "1",
    title: "Building a Responsive React Component with Tailwind CSS",
    content: "Learn how to create beautiful responsive components in React using Tailwind CSS utility classes. This approach will streamline your workflow and make your components more maintainable.",
    author: {
      id: "auth1",
      name: "Sarah Johnson",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    createdAt: "2023-06-15T09:24:00Z",
    likes: 128,
    comments: 32,
    tags: ["React", "Tailwind", "CSS", "Frontend"],
    codeSnippet: "const ResponsiveCard = ({ title, content }) => {\n  return (\n    <div className=\"rounded-lg shadow-md p-6 md:p-8 bg-white\">\n      <h2 className=\"text-xl md:text-2xl font-bold\">{title}</h2>\n      <p className=\"mt-2 text-gray-600\">{content}</p>\n    </div>\n  );\n};",
    language: "javascript"
  },
  {
    id: "2",
    title: "Getting Started with TypeScript Generics",
    content: "TypeScript generics provide a way to create reusable components that can work with a variety of types rather than a single one. Let's explore how to use them effectively.",
    author: {
      id: "auth2",
      name: "Michael Chen",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    createdAt: "2023-06-10T14:15:00Z",
    likes: 95,
    comments: 18,
    tags: ["TypeScript", "Generics", "Frontend", "JavaScript"],
    codeSnippet: "function identity<T>(arg: T): T {\n  return arg;\n}\n\nconst output = identity<string>(\"myString\");\nconsole.log(output); // Output: myString",
    language: "typescript"
  },
  {
    id: "3",
    title: "Optimizing Node.js API Performance",
    content: "Discover techniques to improve the performance of your Node.js APIs. This post covers caching strategies, database query optimization, and efficient error handling patterns.",
    author: {
      id: "auth3",
      name: "Aisha Patel",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    createdAt: "2023-06-05T11:30:00Z",
    likes: 156,
    comments: 42,
    tags: ["Node.js", "API", "Performance", "Backend"],
    codeSnippet: "// Implement a simple in-memory cache\nconst cache = new Map();\n\nfunction getDataWithCache(key, fetchFunction) {\n  if (cache.has(key)) {\n    return Promise.resolve(cache.get(key));\n  }\n\n  return fetchFunction()\n    .then(data => {\n      cache.set(key, data);\n      return data;\n    });\n}",
    language: "javascript"
  }
];

const FeaturedPosts = () => {
  return (
    <section className="py-16">
      <div className="container-content">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Posts</h2>
          <Link to="/explore" className="flex items-center space-x-2 text-primary hover:underline">
            <span>View all</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPosts.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
