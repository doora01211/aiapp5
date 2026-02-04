
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-paw text-xl"></i>
          </div>
          <span className="text-xl font-bungee tracking-tighter text-indigo-900">PetPersona<span className="text-indigo-500">.AI</span></span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition">Universe</a>
          <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition">Gallery</a>
          <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition">Trending</a>
        </nav>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
          Create New
        </button>
      </div>
    </header>
  );
};

export default Header;
