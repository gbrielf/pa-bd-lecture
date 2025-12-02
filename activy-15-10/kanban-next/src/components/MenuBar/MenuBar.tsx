'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { projetoService } from '@/lib/api/projeto';
import { Projeto } from '@/types/projeto.interface';
import { useProject } from '@/contexts/ProjectContext';

export const MenuBar: React.FC = () => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedProjeto, setSelectedProjeto } = useProject();

  useEffect(() => {
    const loadProjetos = async () => {
      try {
        const projetosData = await projetoService.listProjetos();
        setProjetos(projetosData);
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjetos();
  }, []);

  return (
    <nav className="flex items-center justify-between p-2 bg-[#112F41] border-b border-white shadow-sm">
      <div className="flex items-center space-x-4">
        <img src="/images/kanban-plan.png" alt="Kanban Plan" className="h-14 w-14" />
      </div>

      <div className="flex items-center space-x-4">
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white text-gray-800 hover:bg-gray-50 border-gray-300 min-w-[200px] justify-between">
              {selectedProjeto ? selectedProjeto.nome : 'Selecione um projeto'}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={() => setSelectedProjeto(null)}>
              Todos os projetos
            </DropdownMenuItem>
            {loading ? (
              <DropdownMenuItem disabled>
                Carregando...
              </DropdownMenuItem>
            ) : (
              projetos.map((projeto) => (
                <DropdownMenuItem
                  key={projeto.id}
                  onClick={() => setSelectedProjeto(projeto)}
                >
                  {projeto.nome}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Link href="/criar-projeto">
          <Button variant="outline" className="text-green-600 bg-white border-green-200 hover:bg-green-50 hover:border-green-300">
            Novo Projeto
          </Button>
        </Link>

        <Link href="/kanban">
          <Button variant="outline" className="text-gray-600 bg-white border-transparent hover:text-gray-800 hover:border-gray-300">
            Quadro
          </Button>
        </Link>
        
        <Link href="/criar-tarefa">
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Nova Tarefa
          </Button>
        </Link>
      </div>
    </nav>
  );
};