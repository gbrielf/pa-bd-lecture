import { Coluna } from '@/types/coluna.interface';
import { Tarefa } from '@/types/tarefa.interface';
import { tarefaService } from './tarefa';
import { colunaService } from './coluna';

type BoardStateListener = (colunas: Coluna[]) => void;

class BoardStateService {
  private board: Coluna[] = [];
  private listeners: Set<BoardStateListener> = new Set();

  constructor() {
    this.loadInitialBoard();
  }

  // Método para assinar mudanças no estado do quadro
  subscribe(listener: BoardStateListener): () => void {
    this.listeners.add(listener);
    // Retorna função de unsubscribe
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Método privado para notificar todos os listeners
  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.board]));
  }

  // Obtém o estado atual do quadro
  getBoardState(): Coluna[] {
    return [...this.board];
  }

  // Carrega o estado inicial do quadro buscando dados da API
  async loadInitialBoard(): Promise<void> {
    try {
      // Busca colunas e tarefas simultaneamente
      const [colunas, tarefas] = await Promise.all([
        colunaService.listColunas(),
        tarefaService.listTarefas(),
      ]);

      // Casa as colunas com as tarefas
      const colunasComTarefas = colunas.map(coluna => ({
        ...coluna,
        // Filtra as tarefas que pertencem a essa coluna
        tarefas: tarefas.filter(tarefa => tarefa.coluna === coluna.id)
      }));

      this.board = colunasComTarefas;
      this.notifyListeners();
    } catch (error) {
      console.error('Erro ao carregar estado inicial do quadro:', error);
      throw error;
    }
  }

  // Adiciona uma nova tarefa ao quadro
  addTarefa(novaTarefa: Tarefa): void {
    const colunasAtuais = [...this.board];
    const colunaToDo = colunasAtuais.find((col) => col.id === novaTarefa.coluna);

    if (colunaToDo) {
      // Adiciona a tarefa à coluna correspondente
      colunaToDo.tarefas.push(novaTarefa);
      this.board = colunasAtuais;
      this.notifyListeners();
    } else {
      // Se a coluna não for encontrada, recarrega o quadro
      this.loadInitialBoard();
    }
  }

  // Remove uma tarefa do quadro
  deleteTarefa(tarefaId: number, colunaId: number): void {
    const colunasAtuais = [...this.board];
    const coluna = colunasAtuais.find((col) => col.id === colunaId);

    if (coluna) {
      // Remove a tarefa da lista
      coluna.tarefas = coluna.tarefas.filter((task) => task.id !== tarefaId);
      this.board = colunasAtuais;
      this.notifyListeners();
    }
  }

  // Remove uma tarefa do cache (sem fazer chamada para API)
  deleteTarefaDoCache(tarefaId: number, colunaId: number): void {
    const colunasAtuais = [...this.board];
    const coluna = colunasAtuais.find((col) => col.id === colunaId);
    
    if (coluna) {
      // Remove a tarefa da lista
      coluna.tarefas = coluna.tarefas.filter((task) => task.id !== tarefaId);
      this.board = colunasAtuais;
      this.notifyListeners();
    }
  }

  // Atualiza uma tarefa específica
  updateTarefa(tarefaAtualizada: Tarefa): void {
    const colunasAtuais = [...this.board];
    
    for (const coluna of colunasAtuais) {
      const tarefaIndex = coluna.tarefas.findIndex(task => task.id === tarefaAtualizada.id);
      if (tarefaIndex !== -1) {
        coluna.tarefas[tarefaIndex] = tarefaAtualizada;
        this.board = colunasAtuais;
        this.notifyListeners();
        break;
      }
    }
  }

  // Move uma tarefa entre colunas
  moveTarefa(tarefaId: number, colunaOrigemId: number, colunaDestinoId: number): void {
    const colunasAtuais = [...this.board];
    const colunaOrigem = colunasAtuais.find(col => col.id === colunaOrigemId);
    const colunaDestino = colunasAtuais.find(col => col.id === colunaDestinoId);

    if (colunaOrigem && colunaDestino) {
      const tarefaIndex = colunaOrigem.tarefas.findIndex(task => task.id === tarefaId);
      
      if (tarefaIndex !== -1) {
        // Remove a tarefa da coluna origem
        const [tarefa] = colunaOrigem.tarefas.splice(tarefaIndex, 1);
        
        // Atualiza o ID da coluna na tarefa
        tarefa.coluna = colunaDestinoId;
        
        // Adiciona na coluna destino
        colunaDestino.tarefas.push(tarefa);
        
        this.board = colunasAtuais;
        this.notifyListeners();
      }
    }
  }
}

// Exporta uma instância singleton do service
export const boardStateService = new BoardStateService();