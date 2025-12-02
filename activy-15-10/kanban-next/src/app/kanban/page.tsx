'use client';

import React, { useMemo } from 'react';
import { Column } from '@/components/Column/Column';
import { ProjectSummaryCard } from '@/components/ProjectSummaryCard/ProjectSummaryCard';
import { useBoardState } from '@/lib/api/useBoardState';
import { useProject } from '@/contexts/ProjectContext';
import { useProjetosCompletos } from '@/hooks/useProjetosCompletos';

export default function KanbanPage() {
  const { colunas, loading: colunasLoading, error: colunasError } = useBoardState();
  const { projetos, loading: projetosLoading, error: projetosError } = useProjetosCompletos();
  const { selectedProjeto, setSelectedProjeto } = useProject();

  // Filtrar colunas por projeto selecionado
  const colunasFiltradas = useMemo(() => {
    if (!selectedProjeto) {
      return colunas;
    }
    return colunas.filter(coluna => coluna.projeto === selectedProjeto.id);
  }, [colunas, selectedProjeto]);

  const loading = colunasLoading || projetosLoading;
  const error = colunasError || projetosError;

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Carregando quadro...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Erro: {error}</div>
      </main>
    );
  }

  // Se nenhum projeto está selecionado, mostrar resumo dos projetos
  if (!selectedProjeto) {
    return (
      <main className="min-h-screen p-6 bg-[#B8D941]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Visão Geral dos Projetos
            </h1>
            <p className="text-gray-600">
              Selecione um projeto para ver o quadro Kanban completo
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetos.map((projeto) => (
              <ProjectSummaryCard
                key={projeto.id}
                projeto={projeto}
                onSelectProject={(projeto) => {
                  // Converter para o tipo esperado pelo contexto
                  setSelectedProjeto({
                    id: projeto.id,
                    nome: projeto.nome,
                    descricao: projeto.descricao,
                    data_criacao: projeto.data_criacao,
                    proprietario: projeto.proprietario.id,
                    membros: []
                  });
                }}
              />
            ))}
          </div>
          
          {projetos.length === 0 && (
            <div className="text-center text-gray-600 mt-8">
              <p className="text-xl">Nenhum projeto encontrado</p>
              <p className="text-sm mt-2">Crie seu primeiro projeto para começar!</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Se um projeto está selecionado, mostrar o quadro Kanban
  return (
    <main className="flex items-start justify-center min-h-screen gap-6 p-6 bg-[#B8D941]">
      {colunasFiltradas.length > 0 ? (
        colunasFiltradas.map((col) => (
          <Column key={col.id} coluna={col} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="text-xl text-gray-600">
            {selectedProjeto 
              ? `Nenhuma coluna encontrada para o projeto "${selectedProjeto.nome}"`
              : 'Nenhuma coluna encontrada'
            }
          </div>
        </div>
      )}
    </main>
  );
}