
import React, { useState, useCallback } from 'react';
import { TattooFormData } from './types';
import TattooForm from './components/TattooForm';
import ImageDisplay from './components/ImageDisplay';
import { generateTattooImage } from './services/geminiService';
import { SparklesIcon } from './components/icons/SparklesIcon';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (formData: TattooFormData) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateTattooImage(formData);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError('Falha ao gerar a imagem. Verifique o console para mais detalhes e tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-4">
            <SparklesIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Gerador de Tatuagem IA
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Descreva sua ideia de tatuagem nos campos abaixo e deixe a nossa IA criar um design exclusivo para você.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <TattooForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex items-center justify-center min-h-[400px] lg:min-h-0">
            <ImageDisplay 
              isLoading={isLoading} 
              error={error} 
              imageUrl={generatedImage} 
            />
          </div>
        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Criado com React, Tailwind CSS e Gemini API.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
