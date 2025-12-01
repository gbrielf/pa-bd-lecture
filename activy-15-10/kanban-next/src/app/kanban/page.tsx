'use client';

import React from 'react';
import { Column } from '@/components/Column/Column';
import { useBoardState } from '@/lib/api/useBoardState';

export default function KanbanPage() {
  const { colunas, loading, error } = useBoardState();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando quadro...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Erro: {error}</div>
      </div>
    );
  }

  return (
    <main className="flex items-start justify-center min-h-screen gap-6 p-6 bg-[#B8D941]">
      {colunas.map((col) => (
        <Column key={col.id} coluna={col} />
      ))}
    </main>
  );
}