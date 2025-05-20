import React from 'react';
import { TitleSuggestion } from '../types';
import { Clipboard, CheckCircle, TrendingUp, ZapIcon, HeartIcon, LightbulbIcon, TimerIcon, BarChart2 } from 'lucide-react';

interface TitleResultsProps {
  results: TitleSuggestion[];
}

const emotionIcons = {
  shock: <ZapIcon className="h-5 w-5 text-purple-500" />,
  excitement: <TrendingUp className="h-5 w-5 text-yellow-500" />,
  emotional: <HeartIcon className="h-5 w-5 text-pink-500" />,
  curiosity: <LightbulbIcon className="h-5 w-5 text-blue-500" />,
  urgency: <TimerIcon className="h-5 w-5 text-red-500" />,
};

const emotionLabels = {
  shock: 'Shocking',
  excitement: 'Exciting',
  emotional: 'Emotional',
  curiosity: 'Curious',
  urgency: 'Urgent',
};

const TitleResults: React.FC<TitleResultsProps> = ({ results }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-blue-600';
    return 'text-yellow-600';
  };
  
  if (results.length === 0) {
    return null;
  }

  const averageConfidence = Math.round(
    results.reduce((acc, curr) => acc + curr.confidence, 0) / results.length
  );
  
  return (
    <div className="w-full mt-8 space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Viral Title Suggestions</h2>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          <BarChart2 className="h-5 w-5 text-gray-500" />
          <span className="text-sm font-medium text-gray-600">Average Confidence:</span>
          <span className={`text-lg font-bold ${getConfidenceColor(averageConfidence)}`}>
            {averageConfidence}%
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {results.map((result) => {
          const confidenceColor = result.confidence >= 90 
            ? 'bg-green-100 text-green-800' 
            : result.confidence >= 80 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-yellow-100 text-yellow-800';
              
          const isCopied = copiedId === result.id;
          
          return (
            <div 
              key={result.id}
              className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              {/* Confidence indicator */}
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-gray-200 to-gray-200" style={{ width: '100%' }}>
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <div className="flex items-center space-x-2 mb-1">
                    {emotionIcons[result.emotion]}
                    <span className="text-xs font-medium text-gray-500">
                      {emotionLabels[result.emotion]}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                    {result.title}
                  </h3>
                </div>
                
                <div className="flex flex-col items-end">
                  <button
                    onClick={() => copyToClipboard(result.title, result.id)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Copy to clipboard"
                  >
                    {isCopied ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clipboard className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                    )}
                  </button>
                  
                  <div className={`${confidenceColor} text-xs font-medium px-2 py-1 rounded-full mt-2 flex items-center space-x-1`}>
                    <span>{result.confidence}%</span>
                    <span className="hidden sm:inline">Viral Potential</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom gradient for visual appeal */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleResults;