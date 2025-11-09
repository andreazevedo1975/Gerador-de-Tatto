import React, { useState } from 'react';
import { TattooFormData } from '../types';

interface TattooFormProps {
  onSubmit: (formData: TattooFormData) => void;
  isLoading: boolean;
}

const tattooStyles = [
  'Blackwork',
  'Fine Line',
  'Aquarela',
  'Realismo',
  'Old School',
  'Neo Tradicional',
  'Geométrico',
  'Pontilhismo',
];

const initialFormData: TattooFormData = {
  mainElement: 'Fênix',
  adjectives: 'Majestosa e agressiva',
  additionalElements: 'Envolta em chamas azuis, com um sol nascente ao fundo',
  style: 'Realismo',
  colorPalette: 'Preto e Cinza com detalhes em branco (highlights)',
  lineWork: 'Sombreamento suave e hiper-detalhado',
  format: 'Vertical, alongado',
  placement: 'Antebraço externo',
  focus: 'Vista completa da tatuagem, em fundo branco puro',
  detailLevel: 'Hiper-detalhado',
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-l-4 border-cyan-400 pl-3">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const InputField: React.FC<{ label: string; name: keyof TattooFormData; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder: string; isTextArea?: boolean }> = ({ label, name, value, onChange, placeholder, isTextArea = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    {isTextArea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={2}
        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
    ) : (
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
    )}
  </div>
);

const TattooForm: React.FC<TattooFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<TattooFormData>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSection title="1. Conceito Principal">
        <InputField label="Tema/Elemento Principal" name="mainElement" value={formData.mainElement} onChange={handleChange} placeholder="Leão, Flor de Lótus, Crânio..." />
        <InputField label="Adjetivos/Sensação" name="adjectives" value={formData.adjectives} onChange={handleChange} placeholder="Feroz, Sereno, Minimalista..." />
        <InputField label="Elementos Adicionais/Contexto" name="additionalElements" value={formData.additionalElements} onChange={handleChange} placeholder="Com elementos geométricos, metade robótico..." isTextArea />
      </FormSection>

      <FormSection title="2. Estilo de Tatuagem">
        <div>
          <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-1">Estilo Principal</label>
          <select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
          >
            {tattooStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <InputField label="Paleta de Cores" name="colorPalette" value={formData.colorPalette} onChange={handleChange} placeholder="Somente Preto e Cinza, Cores Vibrantes..." />
        <InputField label="Traço/Linhas" name="lineWork" value={formData.lineWork} onChange={handleChange} placeholder="Linhas finas e delicadas, Linhas grossas..." />
      </FormSection>
      
      <FormSection title="3. Composição e Colocação">
        <InputField label="Formato Geral" name="format" value={formData.format} onChange={handleChange} placeholder="Redondo, Vertical, Horizontal..." />
        <InputField label="Colocação (Opcional)" name="placement" value={formData.placement} onChange={handleChange} placeholder="No antebraço, na panturrilha..." />
        <InputField label="Foco/Ângulo (Opcional)" name="focus" value={formData.focus} onChange={handleChange} placeholder="Close-up no detalhe, Vista completa..." />
        <InputField label="Nível de Detalhe" name="detailLevel" value={formData.detailLevel} onChange={handleChange} placeholder="Hiper-detalhado, Simplificado..." />
      </FormSection>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
      >
        {isLoading ? 'Gerando sua Arte...' : 'Gerar Tatuagem'}
      </button>
    </form>
  );
};

export default TattooForm;