// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tarefa } from '@/types/tarefa.interface';
import { Etiqueta } from '@/types/etiqueta.interface';

// 2. Definição da Interface (Props)
// Isso substitui o @Input() e garante a tipagem
interface TaskCardProps {
  // Propriedades que este componente recebe do componente pai
  tarefa : Tarefa;
  colunaId : number; // Propriedade opcional
  // Eventos que o componente emite (substitui @Output())
}

// 3. Definição do Componente Funcional
// O componente recebe as props desestruturadas
export const TaskCard: React.FC<TaskCardProps> = ({ 
  tarefa,
  colunaId, 
}) => {
  
  
  // 5. Lifecycle Hooks (Substitui ngOnInit, ngOnDestroy, etc.)
const handleEditar = () => {
     console.log('Lógica de editar tarefa aqui', tarefa.id);
}

const handleExcluir = () => {
    console.log('Excluindo tarefa:', tarefa.id, 'da coluna', colunaId);
}

const handlePular = () => {
    console.log('Botão PULAR (next) clicando na tarefa:', tarefa.id);
}

  // 7. Renderização (Substitui o template HTML com JSX)
  return (
    <div className="mb-4 shadow-lg">
      {tarefa && (
        <Card className="w-full overflow-hidden border-2 border-white border-solid">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {tarefa.titulo}
              </CardTitle>
              <div className="flex gap-1">
                {tarefa.tags && tarefa.tags.map((tag: Etiqueta, index: number) => (
                  <Badge 
                    key={index}
                    className="text-white"
                    style={{ backgroundColor: tag.cor }}
                  >
                    {tag.nome}
                  </Badge>
                ))}
              </div>
            </div>
            <CardDescription className="mb-2 text-sm">
              Prioridade: <strong>{tarefa.prioridade}</strong>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col justify-center gap-2">
              <p>{tarefa.descricao}</p>
              <span className="text-xs text-gray-600">
                Responsável: {tarefa.responsavel}
              </span>
              <span className="text-xs text-gray-600">
                Criador: {tarefa.criador}
              </span>
              
              <div className="flex flex-wrap gap-1">
                {/* Área para tags adicionais se necessário */}
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="font-bold"
                  onClick={handleEditar}
                >
                  Editar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleExcluir}
                >
                  Excluir
                </Button>
              </div>

              <div>
                <Button 
                  variant="ghost"
                  className="rounded-full"
                  onClick={handlePular}
                  disabled={!tarefa}
                >
                  Next →
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};