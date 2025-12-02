import { Projeto } from '@/types/projeto.interface';

const API_BASE_URL = 'https://api.example.com/kanban_api/projetos/';

class ProjetoService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listProjetos(): Promise<Projeto[]> {
    try {
      const response = await fetch(API_BASE_URL);
      return this.handleResponse<Projeto[]>(response);
    } catch (error) {
      console.error('Erro ao listar projetos:', error);
      throw error;
    }
  }

  async getProjetoById(id: number): Promise<Projeto> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`);
      return this.handleResponse<Projeto>(response);
    } catch (error) {
      console.error(`Erro ao buscar projeto ${id}:`, error);
      throw error;
    }
  }

  async createProjeto(projeto: Projeto): Promise<Projeto> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projeto),
      });
      return this.handleResponse<Projeto>(response);
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  }

  async updateProjeto(projeto: Projeto): Promise<Projeto> {
    try {
      const response = await fetch(`${API_BASE_URL}${projeto.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projeto),
      });
      return this.handleResponse<Projeto>(response);
    } catch (error) {
      console.error(`Erro ao atualizar projeto ${projeto.id}:`, error);
      throw error;
    }
  }

  async deleteProjeto(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erro ao deletar projeto ${id}:`, error);
      throw error;
    }
  }
}

// Exporta uma instância singleton do service
export const projetoService = new ProjetoService();