'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Flame, Droplet, Dumbbell, Utensils, Info } from 'lucide-react';

export default function PatientPlanView() {
  const [activeTab, setActiveTab] = useState<'diet' | 'workout'>('workout');

  // 🎭 Mocks refletindo o que foi gerado pelo Profissional/IA
  const dietPlan = [
    { id: 1, name: 'Café da Manhã', time: '08:00', items: '3 Ovos inteiros, 30g de Aveia, 1 Banana, Café preto', done: true },
    { id: 2, name: 'Almoço', time: '13:00', items: '150g Peito de Frango, 100g Arroz Branco, Salada à vontade', done: false },
    { id: 3, name: 'Lanche da Tarde', time: '16:30', items: '30g Whey Protein, 20g Pasta de Amendoim', done: false },
    { id: 4, name: 'Jantar', time: '20:00', items: '150g Patinho moído, 150g Batata Inglesa', done: false },
  ];

  const workoutPlan = [
    { id: 1, name: 'Cadeira Extensora Unilateral', sets: '4', reps: '12-15', rest: '60s' },
    { id: 2, name: 'Leg Press 45° (Carga Moderada)', sets: '4', reps: '10-12', rest: '90s' },
    { id: 3, name: 'Mesa Flexora', sets: '3', reps: '12', rest: '60s' },
    { id: 4, name: 'Panturrilha no Leg Press', sets: '4', reps: '15-20', rest: '45s' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Premium Mobile-first */}
      <header className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/me" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold">Seu Plano Atual</h1>
            <p className="text-slate-400 text-sm">Foco: Hipertrofia</p>
          </div>
        </div>

        {/* Alerta de Segurança Pessoal */}
        <div className="bg-indigo-500/20 border border-indigo-400/30 p-4 rounded-2xl flex items-start gap-3">
          <Info className="h-5 w-5 text-indigo-300 shrink-0 mt-0.5" />
          <p className="text-sm text-indigo-100 leading-relaxed">
            Seu treino foi <span className="font-bold text-white">adaptado pela IA e aprovado</span> pelo seu treinador para proteger seu joelho direito. Siga as orientações de carga.
          </p>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 mt-2 space-y-6">
        
        {/* Metas Rápidas do Dia */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 bg-sky-50 rounded-full flex items-center justify-center shrink-0">
              <Droplet className="h-5 w-5 text-sky-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Água (Hoje)</p>
              <p className="font-extrabold text-slate-900">1.2 / 3.5L</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm">
            <div className="h-10 w-10 bg-rose-50 rounded-full flex items-center justify-center shrink-0">
              <Flame className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Calorias</p>
              <p className="font-extrabold text-slate-900">2450 kcal</p>
            </div>
          </div>
        </div>

        {/* Abas de Navegação (Dieta vs Treino) */}
        <div className="flex bg-slate-200/50 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('workout')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'workout' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Dumbbell className="h-4 w-4" /> Treino do Dia
          </button>
          <button 
            onClick={() => setActiveTab('diet')}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'diet' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Utensils className="h-4 w-4" /> Dieta
          </button>
        </div>

        {/* Conteúdo Renderizado Condicionalmente */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          
          {activeTab === 'workout' && (
            <div className="space-y-4">
              <h2 className="font-bold text-slate-900 px-1">Ficha A - Membros Inferiores</h2>
              {workoutPlan.map((ex, index) => (
                <div key={ex.id} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                  <div className="h-12 w-12 bg-slate-100 rounded-xl flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs text-slate-400 font-bold">SÉRIES</span>
                    <span className="text-lg font-extrabold text-slate-900">{ex.sets}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 leading-tight">{ex.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{ex.reps} repetições • {ex.rest} descanso</p>
                  </div>
                </div>
              ))}
              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-md mt-4 active:scale-[0.98] transition-transform">
                Finalizar Treino
              </button>
            </div>
          )}

          {activeTab === 'diet' && (
            <div className="space-y-4">
              <h2 className="font-bold text-slate-900 px-1">Suas Refeições</h2>
              {dietPlan.map((meal) => (
                <div key={meal.id} className={`bg-white border p-4 rounded-2xl flex gap-4 transition-all ${meal.done ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 shadow-sm'}`}>
                  <button className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${meal.done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                    {meal.done && <CheckCircle2 className="h-4 w-4 text-white" />}
                  </button>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{meal.time}</span>
                      <h3 className={`font-bold ${meal.done ? 'text-slate-500 line-through decoration-slate-300' : 'text-slate-900'}`}>{meal.name}</h3>
                    </div>
                    <p className={`text-sm ${meal.done ? 'text-slate-400' : 'text-slate-600'}`}>{meal.items}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}