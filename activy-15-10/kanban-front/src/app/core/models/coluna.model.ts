import { Tarefa } from './tarefa.model';

export interface Coluna {
  id: number;
  titulo: string;
  ordem: number;
  projeto: number;
  tarefas: Tarefa[];
}
