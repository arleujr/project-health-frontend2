'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Activity, Stethoscope, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useClinicalAnamnesis } from '@/hooks/use-clinical-anamnesis';

export default function ClinicalAnamnesisPage() {
  const { 
    currentStep, totalSteps, formData, isLoading, error, 
    nextStep, prevStep, updateField, submitAnamnesis 
  } = useClinicalAnamnesis();

  // Cálculo da barra de progresso
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Navbar Minimalista */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/me" className="text-slate-400 hover:text-slate-600 transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-bold text-slate-900">Perfil Clínico</h1>
        </div>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Etapa {currentStep} de {totalSteps}
        </span>
      </header>

      {/* Barra de Progresso */}
      <div className="h-1 w-full bg-slate-200">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Container Principal */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-6 md:p-10 flex flex-col">
        
        {/* Renderização Condicional das Etapas */}
        <div className="flex-1 space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
          
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Métricas Corporais</h2>
                  <p className="text-slate-500 text-sm">Dados básicos para o cálculo metabólico.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Altura (cm)</label>
                  <input 
                    type="number" placeholder="Ex: 175"
                    value={formData.height} onChange={(e) => updateField('height', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Peso Atual (kg)</label>
                  <input 
                    type="number" placeholder="Ex: 80.5"
                    value={formData.weight} onChange={(e) => updateField('weight', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-rose-100 rounded-xl flex items-center justify-center">
                  <Stethoscope className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Histórico de Saúde</h2>
                  <p className="text-slate-500 text-sm">Segurança médica em primeiro lugar.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Doenças pré-existentes ou lesões crônicas?</label>
                <textarea 
                  rows={3} placeholder="Ex: Hipertensão, hérnia de disco L4-L5..."
                  value={formData.medicalConditions} onChange={(e) => updateField('medicalConditions', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Uso contínuo de medicamentos?</label>
                <textarea 
                  rows={2} placeholder="Ex: Omeprazol, Ritalina..."
                  value={formData.medications} onChange={(e) => updateField('medications', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-rose-600 focus:ring-2 focus:ring-rose-600/20 outline-none resize-none"
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Estilo de Vida</h2>
                  <p className="text-slate-500 text-sm">Para adaptarmos à sua realidade.</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Como é a sua rotina de trabalho/estudos?</label>
                <textarea 
                  rows={4} placeholder="Ex: Trabalho sentado das 9h às 18h, durmo cerca de 6h por noite..."
                  value={formData.routine} onChange={(e) => updateField('routine', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 outline-none resize-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-700 text-sm font-bold mt-4">
                  <AlertTriangle className="h-5 w-5" />
                  {error}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Rodapé de Navegação (Botões fixos na parte inferior) */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Voltar
          </button>

          {currentStep < totalSteps ? (
            <button 
              onClick={nextStep}
              className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
            >
              Próxima Etapa
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button 
              onClick={submitAnamnesis}
              disabled={isLoading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-md disabled:opacity-70"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  Finalizar e Enviar
                </>
              )}
            </button>
          )}
        </div>

      </main>
    </div>
  );
}