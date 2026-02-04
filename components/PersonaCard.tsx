
import React from 'react';
import { PetAnalysis } from '../types';

interface PersonaCardProps {
  analysis: PetAnalysis;
  imageUrl: string;
}

const PersonaCard: React.FC<PersonaCardProps> = ({ analysis, imageUrl }) => {
  const StatBar = ({ label, value, icon, color }: { label: string, value: number, icon: string, color: string }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-bold text-slate-700 flex items-center">
          <i className={`${icon} mr-2 ${color}`}></i> {label}
        </span>
        <span className="text-xs font-bold text-slate-500">{value}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${color.replace('text-', 'bg-')}`} 
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        {/* Photo Section */}
        <div className="md:w-1/2 relative group">
          <img src={imageUrl} alt="Pet Profile" className="w-full h-full object-cover min-h-[400px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-end items-end p-8">
            <div>
              <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">Archetype</span>
              <h2 className="text-4xl font-bungee text-white">{analysis.archetype}</h2>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Identity Traits</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.personalityTraits.map((trait, i) => (
                <span key={i} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl text-sm font-bold border border-indigo-100">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Attribute Levels</h3>
            <StatBar label="Sassiness" value={analysis.stats.sass} icon="fa-solid fa-wand-sparkles" color="text-pink-500" />
            <StatBar label="Hunger Drive" value={analysis.stats.hunger} icon="fa-solid fa-utensils" color="text-orange-500" />
            <StatBar label="Zoomie Potential" value={analysis.stats.zoomies} icon="fa-solid fa-bolt" color="text-yellow-500" />
            <StatBar label="Loyalty" value={analysis.stats.loyalty} icon="fa-solid fa-heart" color="text-red-500" />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 text-sm">
            <i className="fa-solid fa-quote-left text-slate-300 mr-2"></i>
            {analysis.visualVibe}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
