export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  coluna: number;
  prioridade: string;
  data_criacao: string;
  data_conclusao: string | null;
  
  // Campos aninhados da API Django
  responsavel?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  
  criador?: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  } | null;
  
  tags_nomes: string[];
  comentarios_count: number;
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