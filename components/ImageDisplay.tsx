import React from 'react';
import { LoaderIcon } from './icons/LoaderIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { SaveIcon } from './icons/SaveIcon';

interface ImageDisplayProps {
  isLoading: boolean;
  error: string | null;
  imageUrl: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, error, imageUrl }) => {
  if (isLoading) {
    return (
      <div className="text-center text-gray-400">
        <LoaderIcon className="w-12 h-12 mx-auto animate-spin text-cyan-500" />
        <p className="mt-4 text-lg">Sua tatuagem está sendo desenhada pela IA...</p>
        <p className="text-sm">Isso pode levar alguns instantes.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 bg-red-900/20 p-6 rounded-lg">
        <p className="font-semibold">Ocorreu um erro</p>
        <p className="mt-2 text-sm">{error}</p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        <img 
          src={imageUrl} 
          alt="Tatuagem gerada por IA" 
          className="max-w-full max-h-[80%] object-contain rounded-lg shadow-2xl"
        />
        <div className="flex items-center gap-4 mt-4">
          <a
            href={imageUrl}
            download="tatuagem-gerada-ia.png"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
            Baixar Imagem
          </a>
          <a
            href={imageUrl}
            download="tatuagem-salva-ia.png"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <SaveIcon className="w-5 h-5" />
            Salvar Desenho
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center text-gray-500">
        <div className="w-24 h-24 border-4 border-dashed border-gray-600 rounded-full mx-auto flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
      <h3 className="mt-4 text-xl font-semibold">Sua arte aparecerá aqui</h3>
      <p className="mt-1 text-sm">Preencha o formulário e clique em "Gerar Tatuagem" para começar.</p>
    </div>
  );
};

export default ImageDisplay;
