
import React from "react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab 
}) => {
  return (
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
  );
};

export default SearchBar;
