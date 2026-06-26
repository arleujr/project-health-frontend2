'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, Utensils, Zap, Sparkles, Flame, Droplet, Beef } from 'lucide-react';

export default function StrategyBuilderPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  // 🎭 Mock de dados da Dieta para o MVP
  const [meals, setMeals] = useState([
    { id: 1, name: 'Café da Manhã', time: '08:00', items: '2 Ovos mexidos, 1 Fatia de Pão Integral, Café sem açúcar' },
  ]);

  // Simulação do botão "Preencher com IA"
  const handleAIGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setMeals([
        { id: 1, name: 'Café da Manhã', time: '08:00', items: '3 Ovos inteiros, 30g de Aveia, 1 Banana, Café preto' },
        { id: 2, name: 'Almoço', time: '13:00', items: '150g Peito de Frango, 100g Arroz Branco, Salada à vontade' },
        { id: 3, name: 'Lanche da Tarde', time: '16:30', items: '30g Whey Protein, 20g Pasta de Amendoim' },
        { id: 4, name: 'Jantar', time: '20:00', items: '150g Patinho moído, 150g Batata Inglesa' },
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
              <h1 className="text-2xl font-extrabold text-slate-900">Plano Alimentar</h1>
              <p className="text-slate-500 text-sm">Paciente: Carlos Silva • Foco: Hipertrofia</p>
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
              Gerar Base com IA
            </button>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-md">
              <Save className="h-4 w-4" />
              Salvar Plano
            </button>
          </div>
        </div>

        {/* Resumo de Macros (Dashboard Superior) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-rose-50 rounded-lg flex items-center justify-center shrink-0">
              <Flame className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calorias</p>
              <p className="text-lg font-extrabold text-slate-900">2.450 <span className="text-sm font-normal text-slate-500">kcal</span></p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
              <Beef className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Proteínas</p>
              <p className="text-lg font-extrabold text-slate-900">180<span className="text-sm font-normal text-slate-500">g</span></p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Carbos</p>
              <p className="text-lg font-extrabold text-slate-900">250<span className="text-sm font-normal text-slate-500">g</span></p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
            <div className="h-10 w-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
              <Droplet className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gorduras</p>
              <p className="text-lg font-extrabold text-slate-900">80<span className="text-sm font-normal text-slate-500">g</span></p>
            </div>
          </div>
        </div>

        {/* Lista de Refeições */}
        <div className="space-y-4 mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Utensils className="h-5 w-5 text-slate-400" />
              Refeições do Dia
            </h2>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Adicionar Refeição
            </button>
          </div>

          <div className="grid gap-4">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">{meal.time}</span>
                    <h3 className="font-bold text-slate-900">{meal.name}</h3>
                  </div>
                  <button className="text-slate-300 hover:text-rose-500 transition-colors text-xs font-bold uppercase">
                    Remover
                  </button>
                </div>
                <textarea 
                  defaultValue={meal.items}
                  className="w-full text-sm text-slate-700 bg-slate-50 border border-transparent focus:border-slate-200 focus:bg-white rounded-xl p-3 outline-none resize-none transition-all"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}