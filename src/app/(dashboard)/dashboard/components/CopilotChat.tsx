'use client';

import React, { useState } from 'react';
import { BrainCircuit, X, Send, Sparkles, MessageSquare, Loader2 } from 'lucide-react';
import { api } from '@/lib/api'; // Importando o seu cliente Axios

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export function CopilotChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Olá! Sou seu Copiloto de IA da HealthCore. Estou conectado ao sistema. O que você gostaria de saber hoje?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para mostrar que a IA está pensando

  const quickCommands = [
    "Quantos pacientes ativos nós temos?",
    "Resuma a última semana do Carlos",
    "Quem está com o SLA atrasado?"
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    // 1. Adiciona a mensagem do usuário na tela
    const userMsg: Message = { id: crypto.randomUUID(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Chama a sua API real no Back-end (que vai pro Groq)
      const response = await api.post('/v1/copilot/chat', {
        message: textToSend
      });

      // 3. Adiciona a resposta real da IA na tela
      const aiMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: response.data.reply || "Desculpe, não consegui gerar uma resposta."
      };
      setMessages(prev => [...prev, aiMsg]);
      
    } catch (error) {
      console.error("Erro ao falar com o Copiloto:", error);
      
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        sender: 'ai',
        text: "Desculpe, ocorreu um erro de conexão com meus servidores centrais. Tente novamente."
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão Flutuante */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all z-50 animate-bounce group"
        >
          <BrainCircuit className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Janela do Chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden z-50 font-sans animate-in slide-in-from-bottom-5 duration-200">
          
          <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-4 text-white flex items-center justify-between border-b border-indigo-900">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-500/20 rounded-lg">
                <Sparkles className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">HealthCore Copilot</h3>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full"></span> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-slate-400 hover:text-white" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0
                  ${msg.sender === 'user' ? 'bg-slate-900 text-white' : 'bg-indigo-600 text-white'}`}
                >
                  {msg.sender === 'user' ? 'VC' : <BrainCircuit className="h-4 w-4" />}
                </div>
                <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap
                  ${msg.sender === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'}`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Indicador de Digitando... */}
            {isLoading && (
               <div className="flex gap-2 max-w-[85%] mr-auto">
                 <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
                    <Loader2 className="h-4 w-4 animate-spin" />
                 </div>
                 <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none text-sm text-slate-500 shadow-sm flex items-center gap-2">
                   Consultando dados...
                 </div>
               </div>
            )}
          </div>

          <div className="p-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5">
            {quickCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(cmd)}
                disabled={isLoading}
                className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50"
              >
                <MessageSquare className="h-3 w-3" />
                {cmd}
              </button>
            ))}
          </div>

          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
              disabled={isLoading}
              placeholder="Pergunte algo sobre a clínica..."
              className="flex-1 bg-slate-100 hover:bg-slate-150/50 focus:bg-white border-0 focus:ring-2 focus:ring-indigo-600 rounded-xl px-4 py-2 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="h-9 w-9 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm shrink-0"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}