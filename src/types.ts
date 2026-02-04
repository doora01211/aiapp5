
export enum PetArchetype {
  DRAMA_QUEEN = 'Drama Queen',
  CEO = 'The Executive',
  PHILOSOPHER = 'Lazy Philosopher',
  GOLDEN_ENERGY = 'Golden Retriever Boyfriend Energy',
  CHAOS_GREMLIN = 'Chaos Gremlin',
  REGAL_MONARCH = 'Regal Monarch',
  SHY_INTROVERT = 'The Wallflower'
}

export interface PetAnalysis {
  archetype: PetArchetype;
  personalityTraits: string[];
  suggestedMemeCaptions: string[];
  visualVibe: string;
  stats: {
    sass: number;
    hunger: number;
    zoomies: number;
    loyalty: number;
  };
}

export interface GeneratedContent {
  id: string;
  type: 'meme' | 'sticker' | 'wallpaper' | 'seasonal' | 'identity_card';
  imageUrl: string;
  title: string;
  description: string;
}

export interface AppState {
  isAnalyzing: boolean;
  isGenerating: boolean;
  error: string | null;
  uploadedImage: string | null;
  analysis: PetAnalysis | null;
  content: GeneratedContent[];
}
