'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { projetoService } from '@/lib/api/projeto';
import { Projeto } from '@/types/projeto.interface';

// Interface para o formulário de projeto
interface FormDataProjeto {
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
}

interface ProjetoCreatorProps {
  onProjetoCreated?: (projeto: Projeto) => void;
}

export const ProjetoCreator: React.FC<ProjetoCreatorProps> = ({ 
  onProjetoCreated 
}) => {
  const router = useRouter();
  
  // Estado do formulário
  const [formData, setFormData] = useState<FormDataProjeto>({
    nome: '',
    descricao: '',
    data_inicio: '',
    data_fim: ''
  });

  // Estados adicionais
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Função para atualizar campos do formulário
  const handleInputChange = (field: keyof FormDataProjeto, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Função de validação básica
  const isFormValid = () => {
    return formData.nome.trim() !== '' && formData.descricao.trim() !== '';
  };

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      console.error('Formulário inválido - nome e descrição são obrigatórios');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('=== DEBUG CRIAÇÃO DE PROJETO ===');
      console.log('FormData original:', formData);
      
      // Preparar dados para envio
      const dadosParaEnvio = {
        nome: formData.nome,
        descricao: formData.descricao,
        data_inicio: formData.data_inicio || null,
        data_fim: formData.data_fim || null,
        // Django vai definir automaticamente o criador baseado na autenticação
        membros: [] // Por enquanto vazio, pode ser expandido futuramente
      };
      
      console.log('Dados sendo enviados para API:', dadosParaEnvio);
      console.log('===================================');
      
      const novoProjeto = await projetoService.createProjeto(dadosParaEnvio);
      
      console.log('Projeto criado com sucesso:', novoProjeto);
      
      // Callback para notificar componente pai
      if (onProjetoCreated) {
        onProjetoCreated(novoProjeto);
      }
      
      // Mostrar mensagem de sucesso
      setSuccessMessage(`Projeto "${novoProjeto.nome}" criado com sucesso!`);
      
      // Limpar formulário
      setFormData({
        nome: '',
        descricao: '',
        data_inicio: '',
        data_fim: ''
      });
      
      // Redirecionar para o kanban após 2 segundos
      setTimeout(() => {
        router.push('/kanban');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Se sucesso, mostrar mensagem
  if (successMessage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 border border-green-200 rounded-lg shadow-lg bg-green-50">
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            Projeto Criado! 🎉
          </h2>
          <p className="mb-6 text-green-700">{successMessage}</p>
          <div className="flex gap-3">
            <Button 
              onClick={() => setSuccessMessage('')}
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50"
            >
              Criar Outro Projeto
            </Button>
            <Button 
              onClick={() => router.push('/kanban')}
              className="bg-green-600 hover:bg-green-700"
            >
              Ir para Quadro Kanban
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Criar Novo Projeto
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* NOME DO PROJETO */}
          <div>
            <Label htmlFor="nome-projeto" className="block text-sm font-medium text-gray-700">
              Nome do Projeto *
            </Label>
            <Input
              type="text"
              id="nome-projeto"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Ex: Sistema de E-commerce"
              required
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div>
            <Label htmlFor="descricao-projeto" className="block text-sm font-medium text-gray-700">
              Descrição *
            </Label>
            <Textarea
              id="descricao-projeto"
              value={formData.descricao}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              placeholder="Descreva o objetivo e escopo do projeto..."
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
              rows={3}
            />
          </div>

          {/* DATA INÍCIO */}
          <div>
            <Label htmlFor="data-inicio" className="block text-sm font-medium text-gray-700">
              Data de Início
            </Label>
            <Input
              type="date"
              id="data-inicio"
              value={formData.data_inicio}
              onChange={(e) => handleInputChange('data_inicio', e.target.value)}
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
            />
          </div>

          {/* DATA FIM */}
          <div>
            <Label htmlFor="data-fim" className="block text-sm font-medium text-gray-700">
              Data de Conclusão
            </Label>
            <Input
              type="date"
              id="data-fim"
              value={formData.data_fim}
              onChange={(e) => handleInputChange('data_fim', e.target.value)}
              className="w-full p-2 mt-1 text-gray-500 border border-gray-300 rounded-md focus:text-gray-500"
            />
          </div>

          {/* BOTÕES */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              onClick={() => router.push('/kanban')}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid() || isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Criando...' : 'Criar Projeto'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};