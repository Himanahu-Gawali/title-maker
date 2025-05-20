import React, { useState } from 'react';
import { TitleSuggestion } from '../types';
import LoadingBar from './LoadingBar';
import TitleResults from './TitleResults';
import { generateTitles } from '../utils/titleGenerator';
import { Sparkles } from 'lucide-react';

const TitleGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TitleSuggestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateTitles = async () => {
    if (!description.trim()) {
      setError('Please provide a description of your video content');
      return;
    }

    setError(null);
    setIsLoading(true);
    
    try {
      const titles = await generateTitles(description);
      setResults(titles);
    } catch (err) {
      setError('Failed to generate titles. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    // Additional actions after loading is complete (if needed)
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 sm:px-6">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-200 transition-all hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          What's your video about?
        </h2>
        
        <p className="text-gray-600 mb-6">
          Describe your content in detail for better results. Include keywords, topic, and target audience.
        </p>
        
        <div className="relative">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., I'm creating a video about modern web development techniques for beginners, focusing on React and responsive design..."
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 min-h-[120px] transition-all duration-200 resize-y"
            disabled={isLoading}
          />
          
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleGenerateTitles}
              disabled={isLoading || !description.trim()}
              className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 transform 
                ${isLoading 
                  ? 'bg-gray-400 text-gray-100 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'}`}
            >
              <Sparkles className="h-5 w-5" />
              <span>
                {isLoading ? 'Generating...' : 'Generate Viral Titles'}
              </span>
            </button>
          </div>
          
          <LoadingBar 
            isLoading={isLoading} 
            onComplete={handleLoadingComplete} 
          />
        </div>
      </div>
      
      {results.length > 0 && (
        <TitleResults results={results} />
      )}
    </div>
  );
};

export default TitleGenerator;