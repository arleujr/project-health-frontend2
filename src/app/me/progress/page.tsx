'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, TrendingDown, Camera, Award, Calendar, Zap, Activity } from 'lucide-react';

export default function PatientProgressPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Header Premium */}
      <header className="bg-slate-900 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/me" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold">Sua Evolução</h1>
            <p className="text-slate-400 text-sm">Últimos 90 dias</p>
          </div>
        </div>

        {/* Card Principal de Resultado */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-5 rounded-2xl border border-indigo-400/30 shadow-xl relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-bold mb-1">Peso Total Perdido</p>
              <h2 className="text-4xl font-extrabold text-white tracking-tight">-4.2 <span className="text-lg font-medium text-indigo-200">kg</span></h2>
            </div>
            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
              <TrendingDown className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-6 space-y-6 -mt-2">
        
        {/* Gráfico de Consistência (Visual mock em CSS) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" /> Histórico de Peso
            </h3>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">Na Meta</span>
          </div>
          
          {/* Mock de Gráfico de Linha simples com barras */}
          <div className="flex items-end justify-between h-32 gap-2 pt-4 border-b border-slate-100 pb-2">
            {[82, 81.5, 80.8, 79.5, 78.9, 78.2, 77.8].map((weight, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">{weight}</span>
                <div 
                  className="w-8 bg-indigo-100 rounded-t-md relative overflow-hidden group-hover:bg-indigo-200 transition-colors"
                  style={{ height: `${(weight - 70) * 5}px` }}
                >
                  <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-md" style={{ height: '4px' }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400">M{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comparativo de Fotos (Antes e Depois) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Camera className="h-5 w-5 text-slate-400" /> Evolução Visual
            </h3>
            <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
              + Nova Foto
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4] border border-slate-200 group">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <Camera className="h-8 w-8 mb-2 opacity-50" />
                <span className="text-xs font-bold">Sem imagem</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <span className="text-white text-xs font-bold">Dia 01 (82kg)</span>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden bg-slate-100 aspect-[3/4] border border-indigo-200 ring-2 ring-indigo-500/20 group">
               <div className="absolute inset-0 flex flex-col items-center justify-center text-indigo-400">
                <Camera className="h-8 w-8 mb-2 opacity-50" />
                <span className="text-xs font-bold">Sem imagem</span>
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-indigo-900/80 to-transparent p-3 flex justify-between items-end">
                <span className="text-white text-xs font-bold">Hoje (77.8kg)</span>
                <span className="flex items-center text-emerald-400 text-[10px] font-extrabold">
                  <TrendingDown className="h-3 w-3 mr-0.5" /> 4.2kg
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Conquistas (Gamificação) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-2">
            <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
              <Award className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Medalha</p>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">1º Mês Focado</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-center text-center gap-2">
            <div className="h-12 w-12 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100">
              <Zap className="h-6 w-6 text-rose-500 fill-rose-500/20" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Sequência</p>
              <p className="text-sm font-extrabold text-slate-900 leading-tight">12 Treinos Seguidos</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}