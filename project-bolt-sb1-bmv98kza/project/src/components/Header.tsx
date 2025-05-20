import React from 'react';
import { YoutubeIcon, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-4 sm:px-6 md:px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <YoutubeIcon className="h-8 w-8" />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="hidden sm:inline">YouTube</span> Title Generator
          </h1>
        </div>
        <div className="flex items-center space-x-1 bg-white/10 py-1 px-3 rounded-full text-sm">
          <Sparkles className="h-4 w-4 text-yellow-300" />
          <span className="hidden sm:inline">Boost Your</span> 
          <span className="font-semibold">Clicks & Views</span>
        </div>
      </div>
    </header>
  );
};

export default Header;