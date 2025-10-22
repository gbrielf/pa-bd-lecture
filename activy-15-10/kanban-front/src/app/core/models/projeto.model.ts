export interface Projeto{
    nome: string;
    descricao?: string;
    data_criacao: string;
    proprietario: number; //id do usuario
    membros?: number[]; //ids dos usuarios
}