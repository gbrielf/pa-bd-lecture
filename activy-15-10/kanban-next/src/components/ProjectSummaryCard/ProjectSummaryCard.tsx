'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjetoCompleto {
  id: number;
  nome: string;
  descricao?: string;
  data_criacao: string;
  proprietario: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    telefone: string;
  };
  membros_nomes: string[];
  colunas: {
    id: number;
    titulo: string;
    ordem: number;
    projeto: number;
    nome_projeto: string;
    tarefas: any[];
  }[];
  tarefas_totais: number;
}

interface ProjectSummaryCardProps {
  projeto: ProjetoCompleto;
  onSelectProject: (projeto: ProjetoCompleto) => void;
}

export const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ 
  projeto, 
  onSelectProject 
}) => {
  // Calcular resumo das tarefas por coluna
  const getColumnSummary = () => {
    const summary = projeto.colunas?.map((coluna: any) => ({
      titulo: coluna.titulo,
      quantidade: coluna.tarefas?.length || 0
    })) || [];
    
    return summary;
  };

  const columnSummary = getColumnSummary();
  const totalTarefas = projeto.tarefas_totais || 0;

  return (
    <Card 
      className="transition-shadow duration-200 border-2 cursor-pointer w-80 hover:shadow-lg hover:border-blue-300"
      onClick={() => onSelectProject(projeto)}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
          {projeto.nome}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-3">
          {projeto.descricao}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {/* Resumo das colunas */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Status das Tarefas:</h4>
            <div className="grid grid-cols-3 gap-2">
              {columnSummary.map((coluna: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase">
                    {coluna.titulo}
                  </div>
                  <Badge 
                    variant={coluna.quantidade > 0 ? "default" : "secondary"}
                    className="text-sm font-bold"
                  >
                    {coluna.quantidade}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Total de tarefas */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total de tarefas:</span>
              <Badge variant="outline" className="font-semibold">
                {totalTarefas}
              </Badge>
            </div>
          </div>

          {/* Proprietário */}
          {projeto.proprietario && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Proprietário:</span>
              <span className="text-sm font-medium text-gray-800">
                {projeto.proprietario.first_name} {projeto.proprietario.last_name}
              </span>
            </div>
          )}
        </div>
        
        {/* Call to action */}
        <div className="pt-3 mt-4 border-t">
          <p className="text-xs text-center text-gray-500">
            Clique para ver o quadro Kanban completo
          </p>
        </div>
      </CardContent>
    </Card>
  );
};