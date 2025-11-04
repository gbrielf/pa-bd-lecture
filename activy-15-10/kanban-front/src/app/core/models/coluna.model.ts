import { Tarefa } from "./tarefa.model"; // Importe o model de Tarefa

export interface Coluna {
  id: number;
  titulo: string;
  ordem: number;
  projeto: number;
  
  // 👇 Esta linha é ESSENCIAL para o Front-end,
  // mesmo não existindo no Django Model.
  // Ela será criada pelo BoardStateService.
  tarefas: Tarefa[]; 
}
// antes:
// export interface Coluna {
//     id: number;
//     titulo: string;
//     ordem: string;
//     projeto: number;
// }
