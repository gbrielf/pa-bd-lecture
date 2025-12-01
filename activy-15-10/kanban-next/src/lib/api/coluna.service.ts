import { Coluna } from '@/types/coluna.interface';

const API_BASE_URL = 'https://api.example.com/api/colunas/';

// Dados mock para desenvolvimento
const MOCK_COLUNAS: Coluna[] = [
  {
    id: 1,
    titulo: 'A Fazer',
    ordem: 1,
    projeto: 1,
    tarefas: []
  },
  {
    id: 2,
    titulo: 'Em Progresso',
    ordem: 2,
    projeto: 1,
    tarefas: []
  },
  {
    id: 3,
    titulo: 'Concluído',
    ordem: 3,
    projeto: 1,
    tarefas: []
  }
];

class ColunaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listColunas(): Promise<Coluna[]> {
    try {
      // Usar dados mock por enquanto
      console.log('Retornando dados mock das colunas');
      return Promise.resolve([...MOCK_COLUNAS]);
      
      // Código para API real (descomentado quando a API estiver pronta)
      // const response = await fetch(API_BASE_URL);
      // return this.handleResponse<Coluna[]>(response);
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