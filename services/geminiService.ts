
import { GoogleGenAI, Type } from "@google/genai";
import { PetAnalysis, PetArchetype } from "../types";

const API_KEY = process.env.API_KEY || "";

export const analyzePetImage = async (base64Image: string): Promise<PetAnalysis> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1],
            },
          },
          {
            text: "Analyze this pet. Determine its likely personality archetype from these options: Drama Queen, The Executive, Lazy Philosopher, Golden Retriever Boyfriend Energy, Chaos Gremlin, Regal Monarch, The Wallflower. Provide 4 traits, 3 funny meme captions, a 'visual vibe' for image generation, and numerical stats (0-100) for Sass, Hunger, Zoomies, and Loyalty. Return strictly JSON.",
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          archetype: { type: Type.STRING },
          personalityTraits: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          suggestedMemeCaptions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          visualVibe: { type: Type.STRING },
          stats: {
            type: Type.OBJECT,
            properties: {
              sass: { type: Type.NUMBER },
              hunger: { type: Type.NUMBER },
              zoomies: { type: Type.NUMBER },
              loyalty: { type: Type.NUMBER },
            },
            required: ["sass", "hunger", "zoomies", "loyalty"]
          }
        },
        required: ["archetype", "personalityTraits", "suggestedMemeCaptions", "visualVibe", "stats"]
      }
    }
  });

  return JSON.parse(response.text) as PetAnalysis;
};

export const generatePetVisual = async (
  originalImageBase64: string,
  analysis: PetAnalysis,
  type: 'meme' | 'sticker' | 'wallpaper' | 'seasonal'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  let prompt = "";
  switch (type) {
    case 'sticker':
      prompt = `Create a high-quality die-cut sticker of this pet. Characterized as a ${analysis.archetype}. Style: Vibrant cartoon illustration, thick white border, transparent-look background, expressive face. ${analysis.visualVibe}. No text.`;
      break;
    case 'meme':
      prompt = `Generate a cinematic, funny meme version of this pet. Archetype: ${analysis.archetype}. Caption: "${analysis.suggestedMemeCaptions[0]}". Style: Stylized 3D render with dramatic lighting. Focus on the facial expression.`;
      break;
    case 'wallpaper':
      prompt = `A majestic vertical phone wallpaper featuring this pet as a ${analysis.archetype}. Style: Ethereal digital painting, artistic background, high fashion pet aesthetic. 9:16 aspect ratio.`;
      break;
    case 'seasonal':
      prompt = `A festive holiday card version of this pet. Theme: ${new Date().getMonth() === 11 ? 'Christmas' : 'Birthday celebration'}. Style: Whimsical storybook illustration, warm colors, cozy atmosphere.`;
      break;
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: originalImageBase64.split(',')[1],
          }
        },
        { text: prompt }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: type === 'wallpaper' ? "9:16" : "1:1"
      }
    }
  });

  let imageUrl = "";
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      imageUrl = `data:image/png;base64,${part.inlineData.data}`;
      break;
    }
  }
  
  if (!imageUrl) throw new Error("Failed to generate image");
  return imageUrl;
};
