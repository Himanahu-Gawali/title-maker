import React from 'react';
import Header from './components/Header';
import TitleGenerator from './components/TitleGenerator';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start py-8">
        <TitleGenerator />
      </main>
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <p>© {new Date().getFullYear()} YouTube Viral Title Generator. Get more views with catchy titles!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;