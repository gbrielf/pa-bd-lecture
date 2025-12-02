'use client';

import { useState, useEffect } from 'react';

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

export function useProjetosCompletos() {
  const [projetos, setProjetos] = useState<ProjetoCompleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjetosCompletos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/kanban_api/projetos/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjetos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        console.error('Erro ao buscar projetos completos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjetosCompletos();
  }, []);

  return { projetos, loading, error };
}