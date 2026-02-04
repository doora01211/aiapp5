
import React from 'react';
import { GeneratedContent } from '../types';

interface ContentGalleryProps {
  content: GeneratedContent[];
  isGenerating: boolean;
}

const ContentGallery: React.FC<ContentGalleryProps> = ({ content, isGenerating }) => {
  const types = [
    { key: 'meme', label: 'Memes', icon: 'fa-face-laugh-squint' },
    { key: 'sticker', label: 'Stickers', icon: 'fa-note-sticky' },
    { key: 'wallpaper', label: 'Wallpapers', icon: 'fa-mobile-screen' },
    { key: 'seasonal', label: 'Holiday Cards', icon: 'fa-cake-candles' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-bungee text-indigo-900">Your Pet's Universe</h2>
        <div className="flex items-center text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Universe Generated
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.map((item) => (
          <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100">
            <div className={`relative ${item.type === 'wallpaper' ? 'aspect-[9/16]' : 'aspect-square'} overflow-hidden bg-slate-50`}>
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-lg">
                  {item.type}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm mb-6">{item.description}</p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-indigo-50 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-100 transition flex items-center justify-center">
                  <i className="fa-solid fa-download mr-2"></i> Save
                </button>
                <button className="bg-slate-50 text-slate-600 w-12 h-12 rounded-xl hover:bg-slate-100 transition flex items-center justify-center">
                  <i className="fa-solid fa-share-nodes"></i>
                </button>
              </div>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="aspect-square bg-indigo-50 rounded-3xl border-2 border-dashed border-indigo-200 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h4 className="font-bold text-indigo-900">Expanding the Universe...</h4>
            <p className="text-xs text-indigo-600 mt-2">Gemini is sketching out new character assets for your pet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGallery;
