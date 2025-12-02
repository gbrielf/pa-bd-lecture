'use client';

import React from 'react';
import { Column } from '@/components/Column/Column';
import { useBoardState } from '@/lib/api/useBoardState';
import { useProject } from '@/contexts/ProjectContext';
import { ProjectSummaryCard } from '@/components/ProjectSummaryCard/ProjectSummaryCard';
import { useProjetosCompletos } from '@/hooks/useProjetosCompletos';

// Componente para mostrar resumo de todos os projetos
const ProjectSummaryView: React.FC = () => {
  const { projetos, loading, error } = useProjetosCompletos();
  const { setSelectedProjeto } = useProject();

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#B8D941]">
        <div className="text-xl">Carregando projetos...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#B8D941]">
        <div className="text-xl text-red-500">Erro: {error}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-[#B8D941]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Todos os Projetos
          </h1>
          <p className="text-gray-600">
            Selecione um projeto para ver o quadro Kanban completo
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto: any) => (
            <ProjectSummaryCard
              key={projeto.id}
              projeto={projeto}
              onSelectProject={(proj: any) => {
                console.log('Selecionando projeto:', proj);
                // Converter ProjetoCompleto para Projeto
                const projetoSimplificado = {
                  id: proj.id,
                  nome: proj.nome,
                  descricao: proj.descricao,
                  data_criacao: proj.data_criacao,
                  proprietario: proj.proprietario.id,
                  membros: []
                };
                setSelectedProjeto(projetoSimplificado);
              }}
            />
          ))}
        </div>

        {projetos.length === 0 && (
          <div className="text-center">
            <div className="text-xl text-gray-600">
              Nenhum projeto encontrado
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default function KanbanPage() {
  const { colunas, loading, error } = useBoardState();
  const { selectedProjeto } = useProject();

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

  // Se nenhum projeto específico estiver selecionado, mostrar resumo dos projetos
  if (!selectedProjeto) {
    return <ProjectSummaryView />;
  }

  // Filtrar colunas do projeto selecionado
  const colunasDoProjetoSelecionado = colunas.filter(
    col => col.projeto === selectedProjeto.id
  );

  return (
    <main className="flex items-start justify-center min-h-screen gap-6 p-6 bg-[#B8D941]">
      {colunasDoProjetoSelecionado.length > 0 ? (
        colunasDoProjetoSelecionado.map((col) => (
          <Column key={col.id} coluna={col} />
        ))
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="text-xl text-gray-600">
            Nenhuma coluna encontrada para o projeto "{selectedProjeto.nome}"
          </div>
        </div>
      )}
    </main>
  );
}