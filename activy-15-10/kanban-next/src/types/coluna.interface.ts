import { Tarefa } from "./tarefa.interface"; // Importe o model de Tarefa

export interface Coluna {
  id: number;
  titulo: string;
  ordem: number;
  projeto: number;
  nome_projeto: string;
  
  // Esta linha é criada pelo BoardStateService casando com as tarefas
  tarefas: Tarefa[]; 
}
// antes:
// export interface Coluna {
//     id: number;
//     titulo: string;
//     ordem: string;
//     projeto: number;
// }
