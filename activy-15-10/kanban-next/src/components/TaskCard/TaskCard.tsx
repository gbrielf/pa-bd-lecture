// 1. Imports
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tarefa } from '@/types/tarefa.interface';
import { Etiqueta } from '@/types/etiqueta.interface';
import { tarefaService } from '@/lib/api/tarefa';
import { boardStateService } from '@/lib/api/board-state';

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
  
  // Estados para modo de edição
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    titulo: tarefa.titulo,
    descricao: tarefa.descricao,
    prioridade: tarefa.prioridade
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Função para alternar modo de edição
  const handleEditar = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset dos dados quando entra em modo de edição
      setEditData({
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        prioridade: tarefa.prioridade
      });
    }
  };

  // Função para salvar edições
  const handleSalvarEdicao = async () => {
    setIsLoading(true);
    try {
      await tarefaService.patchTarefa(tarefa.id, editData);
      await boardStateService.loadInitialBoard();
      setIsEditing(false);
      console.log('Tarefa atualizada com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      alert('Erro ao atualizar tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para excluir tarefa
  const handleExcluir = async () => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      await tarefaService.deleteTarefa(tarefa.id);
      await boardStateService.loadInitialBoard();
      console.log('Tarefa excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      alert('Erro ao excluir tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para mover para próxima coluna
  const handlePular = async () => {
    const proximaColuna = tarefa.coluna + 1;
    
    setIsLoading(true);
    try {
      await tarefaService.patchTarefa(tarefa.id, { coluna: proximaColuna });
      await boardStateService.loadInitialBoard();
      console.log(`Tarefa movida para coluna ${proximaColuna}`);
    } catch (error) {
      console.error('Erro ao mover tarefa:', error);
      alert('Erro ao mover tarefa');
    } finally {
      setIsLoading(false);
    }
  };

  // 7. Renderização (Substitui o template HTML com JSX)
  return (
    <div className="mb-4 shadow-lg">
      {tarefa && (
        <Card className="w-full overflow-hidden border-2 border-white border-solid">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center justify-center flex-1 text-3xl font-semibold text-center">
                {isEditing ? (
                  <Input
                    value={editData.titulo}
                    onChange={(e) => setEditData(prev => ({ ...prev, titulo: e.target.value }))}
                    className="text-lg font-semibold text-center"
                  />
                ) : (
                  tarefa.titulo
                )}
              </CardTitle>
              <div className="flex gap-1">
                {tarefa.tags_nomes && tarefa.tags_nomes.map((tagNome: string, index: number) => (
                  <Badge 
                    key={index}
                    className="text-white bg-gray-500"
                  >
                    {tagNome}
                  </Badge>
                ))}
              </div>
            </div>
            <CardDescription className="mb-2 text-sm">
              Prioridade: {isEditing ? (
                <select
                  value={editData.prioridade}
                  onChange={(e) => setEditData(prev => ({ ...prev, prioridade: e.target.value }))}
                  className="px-2 py-1 ml-2 border rounded"
                >
                  <option value="Baixa">Baixa</option>
                  <option value="Média">Média</option>
                  <option value="Alta">Alta</option>
                </select>
              ) : (
                <strong>{tarefa.prioridade}</strong>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col justify-center gap-2">
              {isEditing ? (
                <Textarea
                  value={editData.descricao}
                  onChange={(e) => setEditData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Descrição da tarefa"
                />
              ) : (
                <p>{tarefa.descricao}</p>
              )}
              
              <span className="text-xs text-gray-600">
                Responsável: {tarefa.responsavel ? `${tarefa.responsavel.first_name} ${tarefa.responsavel.last_name}` : 'Não definido'}
              </span>
              <span className="text-xs text-gray-600">
                Criador: {tarefa.criador ? `${tarefa.criador.first_name} ${tarefa.criador.last_name}` : 'Não definido'}
              </span>
            </div>
          </CardContent>

          <CardFooter>
            <div className="flex items-center justify-between w-full gap-2">
              {isEditing ? (
                <>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      onClick={handleSalvarEdicao}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Salvando...' : 'Salvar'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={isLoading}
                    >
                      Cancelar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="font-bold transition-colors hover:bg-gray-200 hover:border-gray-300"
                      onClick={handleEditar}
                      disabled={isLoading}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="transition-colors hover:bg-red-700"
                      onClick={handleExcluir}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Excluindo...' : 'Excluir'}
                    </Button>
                  </div>

                  {tarefa.coluna < 3 && (
                    <div>
                      <Button 
                        variant="ghost"
                        className="bg-green-300 hover:bg-green-600"
                        onClick={handlePular}
                        disabled={isLoading}
                      >
                        {isLoading ? '...' : 'Next →'}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};