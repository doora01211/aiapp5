
import React, { useState, useCallback } from 'react';
import { AppState, PetAnalysis, GeneratedContent } from './types';
import { analyzePetImage, generatePetVisual } from './services/geminiService';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import PersonaCard from './components/PersonaCard';
import ContentGallery from './components/ContentGallery';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isAnalyzing: false,
    isGenerating: false,
    error: null,
    uploadedImage: null,
    analysis: null,
    content: [],
  });

  const handleUpload = async (base64: string) => {
    setState(prev => ({ 
      ...prev, 
      isAnalyzing: true, 
      uploadedImage: base64, 
      error: null, 
      analysis: null, 
      content: [] 
    }));

    try {
      // 1. Analyze the pet
      const analysis = await analyzePetImage(base64);
      setState(prev => ({ ...prev, isAnalyzing: false, analysis, isGenerating: true }));

      // 2. Start parallel generation of content types
      const types: Array<'sticker' | 'meme' | 'wallpaper' | 'seasonal'> = ['meme', 'sticker', 'wallpaper', 'seasonal'];
      
      // We generate them sequentially or in batches for UI feedback
      for (const type of types) {
        try {
          const imageUrl = await generatePetVisual(base64, analysis, type);
          const newContent: GeneratedContent = {
            id: `${type}-${Date.now()}`,
            type,
            imageUrl,
            title: `${analysis.archetype} ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            description: type === 'meme' ? analysis.suggestedMemeCaptions[0] : `Exclusive ${type} asset for your unique character.`
          };

          setState(prev => ({
            ...prev,
            content: [...prev.content, newContent]
          }));
        } catch (err) {
          console.error(`Error generating ${type}:`, err);
        }
      }

      setState(prev => ({ ...prev, isGenerating: false }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isAnalyzing: false, 
        isGenerating: false, 
        error: "Oops! The pet identity scanner failed. Let's try another photo." 
      }));
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main>
        {!state.uploadedImage && (
          <UploadZone onUpload={handleUpload} isLoading={state.isAnalyzing} />
        )}

        {state.error && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 flex items-center">
            <i className="fa-solid fa-circle-exclamation mr-3 text-xl"></i>
            <p className="font-semibold">{state.error}</p>
            <button 
              onClick={() => setState(p => ({ ...p, uploadedImage: null }))}
              className="ml-auto text-sm underline font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {state.analysis && state.uploadedImage && (
          <div className="space-y-12 mt-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="text-center">
              <h2 className="text-2xl font-bungee text-indigo-900 mb-2">Analysis Complete</h2>
              <p className="text-slate-500">We've identified your pet's core persona.</p>
            </div>
            
            <PersonaCard analysis={state.analysis} imageUrl={state.uploadedImage} />
            
            {(state.content.length > 0 || state.isGenerating) && (
              <ContentGallery content={state.content} isGenerating={state.isGenerating} />
            )}
          </div>
        )}

        {state.isAnalyzing && !state.analysis && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-24 h-24 mb-6">
               <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                 <i className="fa-solid fa-magnifying-glass text-2xl"></i>
               </div>
            </div>
            <h3 className="text-xl font-bold text-indigo-900">Scanning Soul Fragments...</h3>
            <p className="text-slate-500 max-w-xs text-center mt-2">Gemini is processing facial geometry and personality markers.</p>
          </div>
        )}
      </main>

      {state.uploadedImage && !state.isAnalyzing && (
        <button 
          onClick={() => window.location.reload()}
          className="fixed bottom-8 right-8 bg-white text-indigo-600 border border-indigo-100 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
          title="Start Over"
        >
          <i className="fa-solid fa-rotate-left text-xl group-hover:rotate-[-45deg] transition-transform"></i>
        </button>
      )}
    </div>
  );
};

export default App;
