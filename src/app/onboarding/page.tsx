'use client';

import React, { useState } from 'react';
import { ArrowRight, Target, AlertTriangle, User, Sparkles } from 'lucide-react';
import { useOnboarding } from '@/hooks/use-onboarding';

export default function OnboardingPage() {
  // 🔗 Acoplando a lógica de negócio separada
  const { submitProgressiveProfile, isLoading, error, setError } = useOnboarding();

  // 📝 Estado local apenas para os inputs da UI
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    restriction: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (error) setError(null); // Limpa o erro assim que o usuário volta a digitar
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitProgressiveProfile(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        
        {/* Header Premium */}
        <div className="bg-slate-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-slate-800 rounded-full opacity-50 blur-2xl"></div>
          <Sparkles className="h-8 w-8 text-amber-400 mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Bem-vindo(a) ao Health Core</h1>
          <p className="text-slate-400 text-sm mt-2">Vamos personalizar sua experiência em 30 segundos.</p>
        </div>

        {/* Formulário - Progressive Profiling Fase 1 */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <User className="h-4 w-4 text-slate-400" />
              Como podemos te chamar?
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Seu nome ou apelido"
              value={formData.name}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 transition-all outline-none disabled:opacity-50 text-slate-900"
            />
          </div>

          {/* Objetivo Principal */}
          <div>
            <label htmlFor="goal" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Target className="h-4 w-4 text-slate-400" />
              Qual é o seu objetivo principal hoje?
            </label>
            <select
              id="goal"
              name="goal"
              required
              value={formData.goal}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 transition-all outline-none disabled:opacity-50 text-slate-900 appearance-none"
            >
              <option value="" disabled>Selecione uma meta...</option>
              <option value="Emagrecimento">Emagrecimento / Queima de Gordura</option>
              <option value="Hipertrofia">Hipertrofia / Ganho de Massa</option>
              <option value="Saude">Melhorar Saúde e Disposição</option>
              <option value="Performance">Performance Esportiva</option>
            </select>
          </div>

          {/* Restrição/Alergia (O Alerta Grave Oculto) */}
          <div>
            <label htmlFor="restriction" className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-slate-400" />
              Alguma dor, restrição ou alergia grave?
            </label>
            <textarea
              id="restriction"
              name="restriction"
              placeholder="Ex: Dor no joelho ao agachar, alergia a lactose..."
              value={formData.restriction}
              onChange={handleChange}
              disabled={isLoading}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/20 transition-all outline-none disabled:opacity-50 text-slate-900 resize-none"
            />
            <p className="text-xs text-slate-500 mt-2">Nossa IA médica vai analisar isso imediatamente para garantir sua segurança.</p>
          </div>

          {/* Erro de UI Resiliente */}
          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <p className="text-sm font-semibold text-rose-700">{error}</p>
            </div>
          )}

          {/* Botão de Submit com Loading State */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Configurando seu perfil...</span>
              </div>
            ) : (
              <>
                Acessar Meu Plano
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}