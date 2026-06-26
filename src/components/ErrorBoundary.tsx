'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary capturou uma falha isolada:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-35 flex flex-col items-center justify-center border border-dashed border-red-200 bg-red-50/30 p-4 rounded-2xl text-center">
          <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
          <p className="text-xs font-semibold text-red-700">Falha no Bloco</p>
          <p className="text-[10px] text-red-500 max-w-45 mt-0.5">
            {this.props.fallbackMessage || "Não foi possível carregar este card."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}