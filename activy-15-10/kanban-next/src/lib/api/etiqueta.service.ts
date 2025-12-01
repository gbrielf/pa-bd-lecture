import { Etiqueta } from '@/types/etiqueta.interface';

const API_BASE_URL = 'https://api.example.com/api/etiquetas/';

class EtiquetaService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async listEtiquetas(): Promise<Etiqueta[]> {
    try {
      const response = await fetch(API_BASE_URL);
      return this.handleResponse<Etiqueta[]>(response);
    } catch (error) {
      console.error('Erro ao listar etiquetas:', error);
      throw error;
    }
  }

  async getEtiquetaById(id: number): Promise<Etiqueta> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`);
      return this.handleResponse<Etiqueta>(response);
    } catch (error) {
      console.error(`Erro ao buscar etiqueta ${id}:`, error);
      throw error;
    }
  }

  async createEtiqueta(etiqueta: Etiqueta): Promise<Etiqueta> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(etiqueta),
      });
      return this.handleResponse<Etiqueta>(response);
    } catch (error) {
      console.error('Erro ao criar etiqueta:', error);
      throw error;
    }
  }

  async updateEtiqueta(etiqueta: Etiqueta): Promise<Etiqueta> {
    try {
      const response = await fetch(`${API_BASE_URL}${etiqueta.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(etiqueta),
      });
      return this.handleResponse<Etiqueta>(response);
    } catch (error) {
      console.error(`Erro ao atualizar etiqueta ${etiqueta.id}:`, error);
      throw error;
    }
  }

  async deleteEtiqueta(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}${id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Erro ao deletar etiqueta ${id}:`, error);
      throw error;
    }
  }
}

// Exporta uma instância singleton do service
export const etiquetaService = new EtiquetaService();