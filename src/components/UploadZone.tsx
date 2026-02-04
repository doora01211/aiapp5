
import React from 'react';

interface UploadZoneProps {
  onUpload: (base64: string) => void;
  isLoading: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onUpload, isLoading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bungee text-indigo-900 mb-4">Turn Your Pet Into a Character</h1>
        <p className="text-slate-600 text-lg">Upload one photo. Unlock their entire social identity universe.</p>
      </div>
      
      <div className={`relative border-2 border-dashed rounded-3xl p-12 transition-all bg-white shadow-sm
        ${isLoading ? 'border-indigo-400 bg-indigo-50' : 'border-slate-300 hover:border-indigo-500 hover:shadow-xl'}`}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
            {isLoading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-4xl"></i>
            ) : (
              <i className="fa-solid fa-cloud-arrow-up text-4xl"></i>
            )}
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-800">
              {isLoading ? "Reading their soul..." : "Drop your pet's photo here"}
            </p>
            <p className="text-slate-500">or click to browse your files</p>
          </div>
          <div className="flex space-x-2 text-xs text-slate-400">
            <span className="bg-slate-100 px-2 py-1 rounded">JPG</span>
            <span className="bg-slate-100 px-2 py-1 rounded">PNG</span>
            <span className="bg-slate-100 px-2 py-1 rounded">WEBP</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50">
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-face-laugh-squint text-2xl text-slate-600 mb-2"></i>
          <span className="text-xs font-semibold uppercase">Memes</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-note-sticky text-2xl text-slate-600 mb-2"></i>
          <span className="text-xs font-semibold uppercase">Stickers</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-cake-candles text-2xl text-slate-600 mb-2"></i>
          <span className="text-xs font-semibold uppercase">Cards</span>
        </div>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-mobile-screen text-2xl text-slate-600 mb-2"></i>
          <span className="text-xs font-semibold uppercase">Wallpapers</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
