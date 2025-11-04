export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string | null;
  prioridade: string;
  data_criacao: string;
  data_conclusao: string | null;
  tags: any[]; // (ou Etiqueta[])
  
  // 👇 Esta linha é a FK que o Django envia
  // Nós a usamos para "costurar"
  coluna: number; 
  responsavel: number | null;
  criador: number;
}

// antes:
// import {Etiqueta} from './etiqueta.model';

// export interface Tarefa{
//     id: number;
//     titulo: string;
//     descricao?: string;
//     coluna: number; //id da coluna
//     responsavel?: number; //id do usuario
//     criador: number; //id do usuario
//     prioridade: string;
//     data_criacao: string;
//     data_conclusao?: string;
//     tags?: Etiqueta[];
// }