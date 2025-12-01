import { Tarefa } from '@/types/tarefa.interface';

const API_BASE_URL = 'https://api.example.com/api/tarefas/';

class TarefaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listTarefas(): Promise<Tarefa[]> {
    try {
      const response = await fetch(API_BASE_URL);
      return this.handleResponse<Tarefa[]>(response);
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