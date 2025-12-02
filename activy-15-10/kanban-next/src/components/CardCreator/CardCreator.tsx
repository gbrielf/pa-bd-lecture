// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tarefa } from '@/types/tarefa.interface';
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
}

// 3. Definição do Componente Funcional
export const CardCreator: React.FC<CardCreatorProps> = ({ onTaskCreated }) => {
  const router = useRouter();
  
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    responsavel: null,
    prioridade: 'Média',
  });

  // Estado de loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para atualizar campos do formulário
  const handleInputChange = (field: keyof FormData, value: string) => {
    let finalValue: string | number | null = value;

    if (field === 'responsavel'){
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
    return formData.titulo.trim() !== '';
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
    console.log('Enviando dados:', formData);
    
    const response = await fetch('http://127.0.0.1:8000/kanban_api/tarefas/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok || response.status === 201) {
      const result = await response.json();
      console.log('Tarefa criada com sucesso:', result);
      
      // Limpar formulário
      setFormData({
        titulo: '',
        descricao: '',
        responsavel: null,
        prioridade: 'Média',
      });
      
      alert('Tarefa criada com sucesso!');
      
      // Notificar o componente pai que a tarefa foi criada
      if (onTaskCreated) {
        onTaskCreated();
      }
      
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
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg w-xs">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Crie Sua Nova Tarefa:
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