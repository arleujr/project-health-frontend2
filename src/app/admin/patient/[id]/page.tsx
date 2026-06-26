/* eslint-disable react/no-unescaped-entities */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, User, Bot, CheckCircle2, Edit3, Send, ShieldCheck } from 'lucide-react';

export default function PatientAIPage() {
  const params = useParams();
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // 🎭 Mock de dados focado no Carlos Silva (mock-1) para a apresentação
  const patient = {
    name: 'Carlos Silva',
    goal: 'Hipertrofia',
    restrictionAlert: 'Dor aguda no joelho direito ao tentar agachar',
    history: 'Iniciante, 85kg, sedentário até 2 meses atrás.'
  };

  const aiDraft = "Olá Carlos! Notei seu relato sobre a dor aguda no joelho direito. Para garantirmos sua segurança e não agravar nenhuma lesão, alterei seu plano: vamos suspender o Agachamento Livre temporariamente. Substituí pelo Leg Press 45° com carga reduzida e Cadeira Extensora unilateral. Se a dor persistir, me avise imediatamente.";

  // Simula o clique do profissional aprovando a decisão da IA
  const handleApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      setIsApproved(true);
      // Redireciona de volta pro painel após 2 segundos
      setTimeout(() => router.push('/admin'), 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navegação e Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-100 transition">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              Prontuário: {patient.name}
            </h1>
            <p className="text-slate-500 text-sm">Objetivo: {patient.goal} • {patient.history}</p>
          </div>
        </div>

        {/* 🚨 O Alerta do Paciente */}
        <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 md:p-8 flex items-start gap-4 shadow-sm">
          <div className="h-12 w-12 bg-rose-100 rounded-full flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-rose-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-rose-900 mb-1">Alerta Médico Relatado</h2>
            <p className="text-rose-700 italic">"{patient.restrictionAlert}"</p>
            <div className="mt-4 flex items-center gap-2 text-sm text-rose-600 font-semibold bg-white/50 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="h-4 w-4" />
              Treino bloqueado temporariamente por segurança
            </div>
          </div>
        </div>

        {/* 🤖 A Mágica: Resolução Assistida por IA */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg">
          <div className="bg-indigo-900 px-6 py-4 flex items-center gap-3">
            <Bot className="h-6 w-6 text-indigo-300" />
            <h3 className="text-white font-bold tracking-wide">Assistente IA Health Core</h3>
            <span className="ml-auto px-2 py-1 bg-indigo-800 text-indigo-100 text-xs font-bold rounded">Ação Necessária</span>
          </div>
          
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Sugestão de Conduta Gerada</p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-700 leading-relaxed relative">
                {/* Ícone de aspas para dar um ar premium */}
                <div className="absolute -top-3 -left-3 text-4xl text-indigo-200 font-serif">"</div>
                {aiDraft}
              </div>
            </div>

            {/* Ações do Profissional (Human-in-the-loop) */}
            {isApproved ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-2" />
                <h4 className="text-emerald-900 font-bold text-lg">Conduta Aprovada e Enviada!</h4>
                <p className="text-emerald-700 text-sm">O plano do paciente foi atualizado e ele foi notificado. Redirecionando...</p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-100">
                <button 
                  onClick={handleApprove}
                  disabled={isApproving}
                  className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 shadow-md shadow-indigo-200"
                >
                  {isApproving ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Aprovar e Atualizar Treino
                    </>
                  )}
                </button>
                <button 
                  disabled={isApproving}
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  <Edit3 className="h-4 w-4" />
                  Editar Rascunho
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}