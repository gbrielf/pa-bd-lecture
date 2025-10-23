import {Etiqueta} from './etiqueta.model';

export interface Tarefa{
    id: number;
    titulo: string;
    descricao?: string;
    coluna: number; //id da coluna
    responsavel?: number; //id do usuario
    criador: number; //id do usuario
    prioridade: string;
    data_criacao: string;
    data_conclusao?: string | null;
    tags?: Etiqueta[];
}