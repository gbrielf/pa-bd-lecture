import { Tarefa } from '@/types/tarefa.interface';

const API_BASE_URL = 'https://api.example.com/api/tarefas/';

// Dados mock para desenvolvimento
const MOCK_TAREFAS: Tarefa[] = [
  {
    id: 1,
    titulo: 'Implementar login',
    descricao: 'Criar tela de login com autenticação',
    responsavel: 'João',
    criador: 'Maria',
    prioridade: 'Alta',
    coluna: 1,
    tags: [
      { id: 1, nome: 'Frontend', cor: '#3b82f6' },
      { id: 2, nome: 'Urgente', cor: '#ef4444' }
    ]
  },
  {
    id: 2,
    titulo: 'Configurar banco de dados',
    descricao: 'Configurar PostgreSQL no servidor',
    responsavel: 'Pedro',
    criador: 'Ana',
    prioridade: 'Média',
    coluna: 2,
    tags: [
      { id: 3, nome: 'Backend', cor: '#10b981' }
    ]
  },
  {
    id: 3,
    titulo: 'Documentar API',
    descricao: 'Criar documentação completa da API',
    responsavel: 'Carlos',
    criador: 'João',
    prioridade: 'Baixa',
    coluna: 3,
    tags: [
      { id: 4, nome: 'Documentação', cor: '#8b5cf6' }
    ]
  }
];

class TarefaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listTarefas(): Promise<Tarefa[]> {
    try {
      // Usar dados mock por enquanto
      console.log('Retornando dados mock das tarefas');
      return Promise.resolve([...MOCK_TAREFAS]);
      
      // Código para API real (descomentado quando a API estiver pronta)
      // const response = await fetch(API_BASE_URL);
      // return this.handleResponse<Tarefa[]>(response);
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      throw error;
    }
  }

  async getTarefaById(id: number): Promise<Tarefa> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`);
      return this.handleResponse<Tarefa>(response);
    } catch (error) {
      console.error(`Erro ao buscar tarefa ${id}:`, error);
      throw error;
    }
  }

  async createTarefa(tarefa: Partial<Tarefa>): Promise<Tarefa> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });
      return this.handleResponse<Tarefa>(response);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }

  async updateTarefa(tarefa: Tarefa): Promise<Tarefa> {
    try {
      const response = await fetch(`${API_BASE_URL}${tarefa.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tarefa),
      });
      return this.handleResponse<Tarefa>(response);
    } catch (error) {
      console.error(`Erro ao atualizar tarefa ${tarefa.id}:`, error);
      throw error;
    }
  }

  async patchTarefa(id: number, mudancas: Partial<Tarefa>): Promise<Tarefa> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mudancas),
      });
      return this.handleResponse<Tarefa>(response);
    } catch (error) {
      console.error(`Erro ao atualizar parcialmente tarefa ${id}:`, error);
      throw error;
    }
  }

  async deleteTarefa(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erro ao deletar tarefa ${id}:`, error);
      throw error;
    }
  }
}

// Exporta uma instância singleton do service
export const tarefaService = new TarefaService();