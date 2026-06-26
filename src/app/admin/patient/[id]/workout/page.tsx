'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Dumbbell, Sparkles, Timer, Repeat, Activity } from 'lucide-react';

export default function WorkoutBuilderPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  // 🎭 Mock do Treino para o MVP
  const [exercises, setExercises] = useState([
    { id: 1, name: 'Aquecimento na Esteira', sets: '1', reps: '10 min', rest: '-' },
  ]);

  // Simulação do botão "Gerar Treino com IA" baseado na restrição do paciente
  const handleAIGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setExercises([
        { id: 1, name: 'Cadeira Extensora Unilateral', sets: '4', reps: '12-15', rest: '60s' },
        { id: 2, name: 'Leg Press 45° (Carga Moderada)', sets: '4', reps: '10-12', rest: '90s' },
        { id: 3, name: 'Mesa Flexora', sets: '3', reps: '12', rest: '60s' },
        { id: 4, name: 'Panturrilha no Leg Press', sets: '4', reps: '15-20', rest: '45s' },
      ]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header do Construtor */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                Plano de Treino <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-md">Ficha A</span>
              </h1>
              <p className="text-slate-500 text-sm">Paciente: Carlos Silva • Foco: Hipertrofia (Adaptação Joelho)</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAIGeneration}
              disabled={isGenerating}
              className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="h-4 w-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              Gerar Treino Seguro (IA)
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md">
              <Save className="h-4 w-4" />
              Salvar Ficha
            </button>
          </div>
        </div>

        {/* Resumo do Treino */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Volume</p>
              <p className="text-lg font-extrabold text-slate-900">15 <span className="text-sm font-normal text-slate-500">Séries</span></p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0">
              <Timer className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Duração Est.</p>
              <p className="text-lg font-extrabold text-slate-900">45<span className="text-sm font-normal text-slate-500">min</span></p>
            </div>
          </div>
        </div>

        {/* Lista de Exercícios */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-slate-400" />
              Exercícios da Sessão
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Adicionar Exercício
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Cabeçalho da Tabela (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Exercício</div>
              <div className="col-span-2 text-center">Séries</div>
              <div className="col-span-2 text-center">Repetições</div>
              <div className="col-span-2 text-center">Descanso</div>
            </div>

            {/* Linhas de Exercícios */}
            <div className="divide-y divide-slate-100">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-slate-50 transition-colors group">
                  <div className="col-span-1 md:col-span-6 flex items-center gap-3">
                    <div className="h-8 w-8 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    <input 
                      type="text" 
                      defaultValue={exercise.name}
                      className="w-full bg-transparent border-none focus:ring-0 text-slate-900 font-bold p-0"
                    />
                  </div>
                  
                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-2">
                    <Repeat className="h-4 w-4 text-slate-400 md:hidden" />
                    <input 
                      type="text" 
                      defaultValue={exercise.sets}
                      className="w-16 md:text-center bg-slate-100 border-transparent focus:border-indigo-300 focus:bg-white rounded-lg px-2 py-1 text-sm outline-none"
                    />
                    <span className="md:hidden text-sm text-slate-500">Séries</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-2">
                    <Activity className="h-4 w-4 text-slate-400 md:hidden" />
                    <input 
                      type="text" 
                      defaultValue={exercise.reps}
                      className="w-20 md:text-center bg-slate-100 border-transparent focus:border-indigo-300 focus:bg-white rounded-lg px-2 py-1 text-sm outline-none"
                    />
                    <span className="md:hidden text-sm text-slate-500">Reps</span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-2 relative">
                    <Timer className="h-4 w-4 text-slate-400 md:hidden" />
                    <input 
                      type="text" 
                      defaultValue={exercise.rest}
                      className="w-16 md:text-center bg-slate-100 border-transparent focus:border-indigo-300 focus:bg-white rounded-lg px-2 py-1 text-sm outline-none"
                    />
                    <span className="md:hidden text-sm text-slate-500">Descanso</span>
                    
                    {/* Botão de excluir aparece no hover */}
                    <button className="absolute right-0 opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-700 transition-opacity text-xs font-bold uppercase hidden md:block">
                      X
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}