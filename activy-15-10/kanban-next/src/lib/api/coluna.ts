import { Coluna } from '@/types/coluna.interface';

const API_BASE_URL = 'http://127.0.0.1:8000/kanban_api/colunas/';

class ColunaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listColunas(): Promise<Coluna[]> {
    try {
      console.log('Buscando colunas da API Django:', API_BASE_URL);
      const response = await fetch(API_BASE_URL);
      return this.handleResponse<Coluna[]>(response);
    } catch (error) {
      console.error('Erro ao listar colunas:', error);
      throw error;
    }
  }

  async getColunaById(id: number): Promise<Coluna> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`);
      return this.handleResponse<Coluna>(response);
    } catch (error) {
      console.error(`Erro ao buscar coluna ${id}:`, error);
      throw error;
    }
  }

  async createColuna(coluna: Coluna): Promise<Coluna> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coluna),
      });
      return this.handleResponse<Coluna>(response);
    } catch (error) {
      console.error('Erro ao criar coluna:', error);
      throw error;
    }
  }

  async updateColuna(coluna: Coluna): Promise<Coluna> {
    try {
      const response = await fetch(`${API_BASE_URL}${coluna.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coluna),
      });
      return this.handleResponse<Coluna>(response);
    } catch (error) {
      console.error(`Erro ao atualizar coluna ${coluna.id}:`, error);
      throw error;
    }
  }

  async deleteColuna(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erro ao deletar coluna ${id}:`, error);
      throw error;
    }
  }
}

// Exporta uma instância singleton do service
export const colunaService = new ColunaService();