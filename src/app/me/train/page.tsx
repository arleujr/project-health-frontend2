/* eslint-disable react-hooks/immutability, react-hooks/exhaustive-deps */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Play, Pause, SkipForward, Volume2, Video, Info, Timer, CheckCircle, Activity, BrainCircuit } from 'lucide-react';

// 🎭 Mocks do Treino Ativo
const workoutData = [
  {
    id: 1,
    type: 'warmup',
    name: 'Aquecimento: Esteira',
    duration: 15, // Em segundos para o MVP (na vida real seria 15 * 60)
    tips: ['Mantenha a respiração em 2 tempos.', 'Pace ideal: 6.5 a 7.0 km/h.', 'Não segure nas barras laterais.'],
    aiAudio: 'Vamos começar aquecendo. Mantenha um ritmo leve, apenas para elevar a frequência cardíaca. Respire fundo.'
  },
  {
    id: 2,
    type: 'exercise',
    name: 'Supino Reto com Halteres',
    sets: 4,
    reps: '15',
    rest: 10, // 10 segundos no MVP para você mostrar rápido (vida real: 60s)
    tips: ['Mantenha as escápulas retraídas.', 'Desça até o ângulo de 90 graus.', 'Os cotovelos devem ficar levemente fechados (45 graus).'],
    aiAudio: 'Bora pro Supino. Estabilize bem as costas no banco. Desça controlando o peso, não deixe despencar.'
  }
];

export default function TrainModePage() {
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<'ready' | 'active' | 'resting' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  const currentEx = workoutData[currentExIndex];

  // Lógica do Cronômetro
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((phase === 'active' && currentEx.type === 'warmup') || phase === 'resting') {
      if (timeLeft > 0) {
        interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      } else if (timeLeft === 0) {
        if (phase === 'resting') handleEndRest();
        if (phase === 'active' && currentEx.type === 'warmup') handleNextExercise();
      }
    }
    return () => clearInterval(interval);
  }, [phase, timeLeft, currentEx.type]);

  const simulateAIAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 4000);
  };

  const handleStartWarmup = () => {
    setPhase('active');
    setTimeLeft(currentEx.duration || 0);
    simulateAIAudio();
  };

  const handleStartSet = () => {
    setPhase('active');
    simulateAIAudio();
  };

  const handleFinishSet = () => {
    setPhase('resting');
    setTimeLeft(currentEx.rest || 0);
    // Simula a IA analisando a série pelo smartwatch/tempo e dando feedback
    setTimeout(() => setShowAIFeedback(true), 2000);
  };

  const handleEndRest = () => {
    setShowAIFeedback(false);
    if (currentEx.sets && currentSet < currentEx.sets) {
      setCurrentSet((prev) => prev + 1);
      setPhase('ready');
    } else {
      handleNextExercise();
    }
  };

  const handleNextExercise = () => {
    if (currentExIndex < workoutData.length - 1) {
      setCurrentExIndex((prev) => prev + 1);
      setCurrentSet(1);
      setPhase('ready');
      setShowAIFeedback(false);
    } else {
      setPhase('finished');
    }
  };

  // Formatação do tempo MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (phase === 'finished') {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-500">
        <div className="h-24 w-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-emerald-400" />
        </div>
        <h1 className="text-4xl font-extrabold mb-2">Treino Concluído!</h1>
        <p className="text-slate-400 mb-8">A IA registrou seu volume de treino e ajustará a próxima sessão.</p>
        <Link href="/me/plan" className="bg-emerald-500 text-slate-950 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-400 transition-colors">
          Voltar para o Plano
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col fixed inset-0 z-50">
      
      {/* Header Imersivo */}
      <header className="px-6 py-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-indigo-400" />
          <span className="font-bold text-sm text-slate-300">
            {currentExIndex + 1} de {workoutData.length}
          </span>
        </div>
        <Link href="/me/plan" className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition text-slate-400">
          <X className="h-5 w-5" />
        </Link>
      </header>

      <main className="flex-1 flex flex-col p-6 overflow-y-auto pb-32">
        
        {/* Título e Controles de Mídia */}
        <div className="mb-8">
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">
            {currentEx.type === 'warmup' ? 'Aquecimento' : `Série ${currentSet} de ${currentEx.sets}`}
          </h2>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
            {currentEx.name}
          </h1>
          
          <div className="flex gap-3">
            <button 
              onClick={simulateAIAudio}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${isPlayingAudio ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              <Volume2 className="h-4 w-4" />
              {isPlayingAudio ? 'Coach falando...' : 'Ouvir Coach'}
            </button>
            {currentEx.type !== 'warmup' && (
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-700 transition-all">
                <Video className="h-4 w-4" />
                Ver Execução
              </button>
            )}
          </div>
        </div>

        {/* Zona do Cronômetro / Feedback Central */}
        <div className="flex-1 flex flex-col items-center justify-center py-10 relative">
          
          {/* Círculo do Cronômetro */}
          <div className={`relative flex items-center justify-center w-64 h-64 rounded-full border-4 ${
            phase === 'active' ? 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 
            phase === 'resting' ? 'border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.2)]' : 
            'border-slate-800'
          }`}>
            <div className="text-center">
              {phase === 'ready' && currentEx.type !== 'warmup' && (
                <>
                  <p className="text-5xl font-extrabold text-white mb-2">{currentEx.reps}</p>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Repetições</p>
                </>
              )}
              {(phase === 'active' && currentEx.type === 'warmup') || phase === 'resting' ? (
                <>
                  <p className={`text-6xl font-extrabold font-mono tracking-tighter ${phase === 'resting' ? 'text-amber-400' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mt-2">
                    {phase === 'resting' ? 'Descanso' : 'Restantes'}
                  </p>
                </>
              ) : null}
              {phase === 'active' && currentEx.type !== 'warmup' && (
                <div className="flex flex-col items-center animate-pulse">
                  <Activity className="h-10 w-10 text-indigo-400 mb-2" />
                  <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm">Em Execução</p>
                </div>
              )}
            </div>
          </div>

          {/* 🤖 Feedback Real-time da IA (Aparece no descanso) */}
          {showAIFeedback && phase === 'resting' && (
            <div className="absolute -bottom-10 w-full max-w-sm bg-slate-800 border border-indigo-500/50 p-4 rounded-2xl flex gap-3 shadow-xl animate-in slide-in-from-bottom-4">
              <BrainCircuit className="h-6 w-6 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-indigo-100 font-bold mb-1">Análise de Cadência</p>
                <p className="text-xs text-slate-300">Você fez as últimas repetições muito rápido. Reduza o peso em 10% e foque em 3 segundos na descida.</p>
              </div>
            </div>
          )}

        </div>

        {/* Dicas de Execução */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-4">
            <Info className="h-4 w-4" /> Dicas de Execução
          </h3>
          <ul className="space-y-3">
            {currentEx.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0"></span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Action Bar Inferior Fixa */}
      <div className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent">
        {phase === 'ready' && currentEx.type === 'warmup' && (
          <button onClick={handleStartWarmup} className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
            <Play className="fill-current h-5 w-5" /> Iniciar Aquecimento
          </button>
        )}

        {phase === 'ready' && currentEx.type !== 'warmup' && (
          <button onClick={handleStartSet} className="w-full h-16 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
            <Play className="fill-current h-5 w-5" /> Iniciar Série {currentSet}
          </button>
        )}

        {phase === 'active' && currentEx.type !== 'warmup' && (
          <button onClick={handleFinishSet} className="w-full h-16 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20">
            <Timer className="h-5 w-5" /> Terminar Série & Descansar
          </button>
        )}

        {phase === 'resting' && (
          <button onClick={handleEndRest} className="w-full h-16 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-extrabold text-lg flex items-center justify-center gap-2 transition-all">
            <SkipForward className="h-5 w-5" /> Pular Descanso
          </button>
        )}

        {phase === 'active' && currentEx.type === 'warmup' && (
          <button onClick={handleNextExercise} className="w-full h-16 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all mt-4">
            <SkipForward className="h-5 w-5" /> Pular Aquecimento
          </button>
        )}
      </div>

    </div>
  );
}