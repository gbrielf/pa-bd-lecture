// 1. Imports
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tarefa } from '@/types/tarefa.interface';
import { Coluna } from '@/types/coluna.interface';
import { useProject } from '@/contexts/ProjectContext';
import { boardStateService } from '@/lib/api/board-state';
import { useRouter } from 'next/navigation';
// 2. Definição da Interface (Props)
interface CardCreatorProps {
  onTaskCreated?: () => void;
}

// Interface para o formulário
interface FormData {
  titulo: string;
  descricao: string;
  responsavel: number | null;
  prioridade: string;
  criador: number;
}

// 3. Definição do Componente Funcional
export const CardCreator: React.FC<CardCreatorProps> = ({ onTaskCreated }) => {
  const router = useRouter();
  const { selectedProjeto } = useProject();
  
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    responsavel: null,
    prioridade: 'Média',
    criador: 1 // TODO: Pegar do usuário logado
  });

  // Estados adicionais
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [primeiraColuna, setPrimeiraColuna] = useState<Coluna | null>(null);

  // Carregar a primeira coluna (To Do) do projeto selecionado
  useEffect(() => {
    if (selectedProjeto) {
      console.log('Projeto selecionado para criar tarefa:', selectedProjeto);
      fetch('http://127.0.0.1:8000/kanban_api/colunas/')
        .then(response => response.json())
        .then((todasColunas: Coluna[]) => {
          console.log('Todas as colunas da API:', todasColunas);
          const colunasDoProject = todasColunas
            .filter(col => col.projeto === selectedProjeto.id)
            .sort((a, b) => a.ordem - b.ordem); // Ordenar por ordem
          
          console.log(`Colunas do projeto ${selectedProjeto.nome} (ID: ${selectedProjeto.id}):`, colunasDoProject);
          
          if (colunasDoProject.length > 0) {
            setPrimeiraColuna(colunasDoProject[0]); // Primeira coluna (To Do)
            console.log('Primeira coluna selecionada:', colunasDoProject[0]);
          } else {
            console.warn('Nenhuma coluna encontrada para o projeto:', selectedProjeto);
          }
        })
        .catch(error => console.error('Erro ao carregar colunas:', error));
    } else {
      console.log('Nenhum projeto selecionado');
      setPrimeiraColuna(null);
    }
  }, [selectedProjeto]);

  // Função para atualizar campos do formulário
  const handleInputChange = (field: keyof FormData, value: string) => {
    let finalValue: string | number | null = value;

    if (field === 'responsavel' || field === 'criador'){
      const numValue = parseInt(value, 10);
      finalValue = isNaN(numValue) || value === '' ? null : numValue;
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: finalValue
    }));
  };

  // Função de validação básica
  const isFormValid = () => {
    return formData.titulo.trim() !== '' && primeiraColuna !== null && selectedProjeto !== null;
  };

  // Função para enviar o formulário
  // src/components/CardCreator/CardCreator.tsx

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!isFormValid()) {
    console.error('Formulário inválido');
    return;
  }

  setIsSubmitting(true);
  
  try {
    // Dados para envio incluindo a primeira coluna do projeto
    const dadosParaEnvio = {
      ...formData,
      coluna: primeiraColuna?.id
    };
    
    console.log('=== DEBUG CRIAÇÃO DE TAREFA ===');
    console.log('FormData original:', formData);
    console.log('Projeto selecionado:', selectedProjeto);
    console.log('Primeira coluna encontrada:', primeiraColuna);
    console.log('Dados sendo enviados para API:', dadosParaEnvio);
    console.log('JSON.stringify dos dados:', JSON.stringify(dadosParaEnvio, null, 2));
    console.log('================================');
    
    const response = await fetch('http://127.0.0.1:8000/kanban_api/tarefas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(dadosParaEnvio),
    });

    if (response.ok || response.status === 201) {
      const result = await response.json();
      console.log('Tarefa criada com sucesso:', result);
      
      // Adicionar a nova tarefa ao estado do board para atualização imediata na UI
      if (primeiraColuna) {
        // Garantir que a tarefa tenha o formato esperado pelo boardStateService
        const novaTarefa: Tarefa = {
          id: result.id,
          titulo: result.titulo,
          descricao: result.descricao || '',
          coluna: result.coluna,
          prioridade: result.prioridade,
          data_criacao: result.data_criacao,
          data_conclusao: result.data_conclusao || null,
          responsavel: result.responsavel || null,
          criador: result.criador || null,
          tags_nomes: result.tags_nomes || [],
          comentarios_count: result.comentarios_count || 0
        };
        
        boardStateService.addTarefa(novaTarefa);
        console.log('Tarefa adicionada ao board state:', novaTarefa);
      }
      
      // Limpar formulário
      setFormData({
        titulo: '',
        descricao: '',
        responsavel: null,
        prioridade: 'Média',
        criador: 1
      });
      
      alert('Tarefa criada com sucesso!');
      
      // Notificar o componente pai que a tarefa foi criada
      if (onTaskCreated) {
        onTaskCreated();
      }
      
      // Navegar de volta para o kanban para ver a tarefa criada
      router.push('/kanban');
      
    } else {
      console.error("STATUS DE ERRO DA API:", response.status);
      const errorBody = await response.json().catch(() => ({ message: 'Sem corpo de erro' }));
      console.error("CORPO DE ERRO DA API:", errorBody);
      throw new Error(`Erro na API: Status ${response.status}`);
    }
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    alert('Erro ao criar tarefa. Verifique o console para detalhes.');
  } finally {
    setIsSubmitting(false);
  }
};

  // 7. Renderização (Substitui o template HTML com JSX)
  
  // Se nenhum projeto está selecionado, mostrar mensagem
  if (!selectedProjeto) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Selecione um Projeto
          </h2>
          <p className="mb-4 text-gray-600">
            Para criar uma nova tarefa, primeiro selecione um projeto no menu superior.
          </p>
          <Button 
            onClick={() => router.push('/kanban')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ir para Quadro Kanban
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg w-xs">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Criar Tarefa em "{selectedProjeto.nome}"
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        {/* TÍTULO */}
        <div>
          <Label htmlFor="titulo-da-nota" className="block text-sm font-medium text-gray-700">
            Título
          </Label>
          <Input
            type="text"
            id="titulo-da-nota"
            value={formData.titulo}
            onChange={(e: any) => handleInputChange('titulo', e.target.value)}
            placeholder="Título da tarefa"
            required
            className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
          />
        </div>

        {/* DESCRIÇÃO */}
        <div>
          <Label htmlFor="descricao-da-nota" className="block text-sm font-medium text-gray-700">
            Descrição
          </Label>
          <Textarea
            id="descricao-da-nota"
            value={formData.descricao}
            onChange={(e: any) => handleInputChange('descricao', e.target.value)}
            placeholder="Detalhes da tarefa..."
            className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
          />
        </div>

        

        {/* RESPONSÁVEL (FK) - Opcional */}
        <div>
          <Label htmlFor="responsavel-pela-tarefa" className="block text-sm font-medium text-gray-700">
            ID do Responsável (opcional)
          </Label>
          <Input
            type="number"
            id="responsavel-pela-tarefa"
            value={formData.responsavel || ''}
            onChange={(e: any) => handleInputChange('responsavel', e.target.value)}
            placeholder="Deixe vazio se não souber"
            className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
          />
        </div>

        {/* PRIORIDADE */}
        <div>
          <Label htmlFor="prioridade-tarefa" className="block text-sm font-medium text-gray-700">
            Prioridade
          </Label>
          <select
            id="prioridade-tarefa"
            value={formData.prioridade}
            onChange={(e) => handleInputChange('prioridade', e.target.value)}
            className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>


        
        {/* BOTÃO SUBMIT */}
        <div>
          <Button 
            type="submit" 
            className="w-full font-bold"
            disabled={!isFormValid() || isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Tarefa'}
          </Button>
        </div>
      </form>
    </div>
  </div>
  );
};