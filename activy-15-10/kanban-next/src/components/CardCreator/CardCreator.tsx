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
  // Props opcionais se necessário no futuro
}

// Interface para o formulário
interface FormData {
  titulo: string;
  descricao: string;
  responsavel: string;
  criador: string;
  prioridade: string;
}

// 3. Definição do Componente Funcional
export const CardCreator: React.FC<CardCreatorProps> = () => {
  const router = useRouter();
  
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    titulo: '',
    descricao: '',
    responsavel: '',
    criador: '',
    prioridade: 'Média'
  });

  // Estado de loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Função para atualizar campos do formulário
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função de validação básica
  const isFormValid = () => {
    return formData.titulo.trim() !== '' && formData.criador.trim() !== '';
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      console.error('Formulário inválido!');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Formulário válido. Enviando para a API real...', formData);
      
      // Aqui você pode implementar a chamada para a API
      const response = await fetch('http://localhost:8000/kanban_api/tarefas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const tarefaCriada = await response.json();
        console.log('API respondeu com sucesso:', tarefaCriada);
        
        // Resetar formulário
        setFormData({
          titulo: '',
          descricao: '',
          responsavel: '',
          criador: '',
          prioridade: 'Média'
        });
        
        // Navegar de volta para o kanban
        router.push('/kanban');
      } else {
        throw new Error('Erro na API');
      }
    } catch (error) {
      console.error('Erro ao criar tarefa via API:', error);
      // Aqui você pode adicionar uma mensagem de erro para o usuário
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

          <div>
            <Label htmlFor="responsavel-pela-tarefa" className="block text-sm font-medium text-gray-700">
              Responsável
            </Label>
            <Input
              type="text"
              id="responsavel-pela-tarefa"
              value={formData.responsavel}
              onChange={(e: any) => handleInputChange('responsavel', e.target.value)}
              placeholder="ID do Responsável"
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
            />
          </div>

          <div>
            <Label htmlFor="criador-da-tarefa" className="block text-sm font-medium text-gray-700">
              Criador
            </Label>
            <Input
              type="text"
              id="criador-da-tarefa"
              value={formData.criador}
              onChange={(e: any) => handleInputChange('criador', e.target.value)}
              placeholder="ID do Criador"
              required
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
            />
          </div>

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