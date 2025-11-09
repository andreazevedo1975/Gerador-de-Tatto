import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { TattooFormData } from '../types';

const buildPrompt = (formData: TattooFormData): string => {
  return `
    Gere uma imagem de desenho de tatuagem altamente detalhada e pronta para o tatuador, seguindo TODAS as especificações abaixo. O resultado é para um estêncil de tatuagem profissional.

    **Instrução Crítica:** O fundo da imagem DEVE SER branco puro (#FFFFFF), sem sombras ou gradientes. A imagem deve ser um desenho de linha limpo e claro, ideal para um tatuador usar como estêncil.

    **Conceito Principal:**
    - Tema/Elemento Principal: ${formData.mainElement || 'não especificado'}
    - Adjetivos/Sensação: ${formData.adjectives || 'não especificado'}
    - Elementos Adicionais/Contexto: ${formData.additionalElements || 'nenhum'}

    **Estilo de Tatuagem:**
    - Estilo Principal: ${formData.style || 'não especificado'}
    - Paleta de Cores: ${formData.colorPalette || 'não especificado'}
    - Traço/Linhas: ${formData.lineWork || 'não especificado'}

    **Composição e Colocação:**
    - Formato Geral: ${formData.format || 'não especificado'}
    - Colocação Sugerida: ${formData.placement || 'não especificado'}
    - Foco/Ângulo: ${formData.focus || 'vista completa da peça'}
    - Nível de Detalhe: ${formData.detailLevel || 'detalhado'}. **Esta é uma especificação crucial, o nível de detalhe deve corresponder exatamente a esta descrição.**
  `.trim();
};

export const generateTattooImage = async (formData: TattooFormData): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key not found. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = buildPrompt(formData);
  console.log("Generated Prompt:", prompt);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    
    throw new Error("Nenhuma imagem foi gerada pela API.");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("A chamada para a API Gemini falhou.");
  }
};