import { useState, useEffect } from 'react';
import { Coluna } from '@/types/coluna.interface';
import { Tarefa } from '@/types/tarefa.interface';
import { boardStateService } from './board-state';

/**
 * Hook personalizado para usar o BoardStateService no React
 * Fornece estado reativo e métodos para gerenciar o quadro kanban
 */
export function useBoardState() {
  const [colunas, setColunas] = useState<Coluna[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscreve para mudanças no estado do quadro
    const unsubscribe = boardStateService.subscribe((novasColunas) => {
      setColunas(novasColunas);
      setLoading(false);
    });

    // Carrega o estado inicial se necessário
    const estadoAtual = boardStateService.getBoardState();
    if (estadoAtual.length === 0) {
      boardStateService.loadInitialBoard()
        .catch((err) => {
          console.error('Erro ao carregar quadro:', err);
          setError('Erro ao carregar dados do quadro');
          setLoading(false);
        });
    } else {
      setColunas(estadoAtual);
      setLoading(false);
    }

    // Cleanup: remove a subscription quando o component for desmontado
    return unsubscribe;
  }, []);

  const actions = {
    // Adiciona uma nova tarefa
    addTarefa: (tarefa: Tarefa) => {
      boardStateService.addTarefa(tarefa);
    },

    // Remove uma tarefa
    deleteTarefa: (tarefaId: number, colunaId: number) => {
      boardStateService.deleteTarefa(tarefaId, colunaId);
    },

    // Remove uma tarefa apenas do cache
    deleteTarefaDoCache: (tarefaId: number, colunaId: number) => {
      boardStateService.deleteTarefaDoCache(tarefaId, colunaId);
    },

    // Atualiza uma tarefa
    updateTarefa: (tarefa: Tarefa) => {
      boardStateService.updateTarefa(tarefa);
    },

    // Move uma tarefa entre colunas
    moveTarefa: (tarefaId: number, colunaOrigemId: number, colunaDestinoId: number) => {
      boardStateService.moveTarefa(tarefaId, colunaOrigemId, colunaDestinoId);
    },

    // Recarrega o quadro
    reloadBoard: async () => {
      setLoading(true);
      setError(null);
      try {
        await boardStateService.loadInitialBoard();
      } catch (err) {
        console.error('Erro ao recarregar quadro:', err);
        setError('Erro ao recarregar dados do quadro');
        setLoading(false);
      }
    }
  };

  return {
    colunas,
    loading,
    error,
    actions
  };
}

export default useBoardState;