// 1. Imports
import React from 'react';
import { Tarefa } from '@/types/tarefa.interface';
import { TaskCard } from '../TaskCard/TaskCard';

// 2. Definição da Interface (Props)
interface ColumnProps {
  coluna: {
    id: number;
    titulo: string;
    ordem: number;
    tarefas: Tarefa[];
  } | null;
}

// 3. Definição do Componente Funcional
export const Column: React.FC<ColumnProps> = ({ coluna }) => {
  
  // Função para determinar a classe de cor baseada na ordem
  const getColumnColorClass = (ordem: number): string => {
    switch (ordem) {
      case 1:
        return 'bg-orange-300';
      case 2:
        return 'bg-yellow-300';
      case 3:
        return 'bg-lime-300';
      default:
        return 'bg-gray-300';
    }
  };

  // 7. Renderização (Substitui o template HTML com JSX)
  return (
    <>
      {coluna && (
        <div 
          className={`flex flex-col gap-4 p-2 text-center border-solid rounded-lg border-3 w-90 h-fit ${getColumnColorClass(coluna.ordem)}`}
        >
          <h2 className="text-4xl font-bold text-[#262626]">
            {coluna.titulo}
          </h2>

          <div className="flex flex-col gap-3">
            {coluna.tarefas.map((task: Tarefa) => (
              <TaskCard 
                key={task.id} 
                tarefa={task} 
                colunaId={coluna.id} 
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};