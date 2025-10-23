import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Coluna } from '../models/coluna.model';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {
  // 1. DADOS MOCK ( "API" Improvisada até integrar front e back)
  private mockColunas: Coluna[] = [
    {
      id: 1,
      titulo: 'A Fazer',
      ordem: 1,
      projeto: 1,
      tarefas: [
        {
          id: 101,
          titulo: 'Task 1 (Mock)',
          descricao: '...',
          prioridade: 'Alta',
          coluna: 1,
          criador: 1,
          responsavel: 1,
          data_criacao: '',
          data_conclusao: null,
          tags: [],
        },
        {
          id: 102,
          titulo: 'Task 2 (Mock)',
          descricao: '...',
          prioridade: 'Baixa',
          coluna: 1,
          criador: 1,
          responsavel: 1,
          data_criacao: '',
          data_conclusao: null,
          tags: [],
        },
      ],
    },
    { id: 2, titulo: 'Em Progresso', ordem: 2, projeto: 1, tarefas: [] },
    { id: 3, titulo: 'Concluído', ordem: 3, projeto: 1, tarefas: [] },
  ];

  // O BehaviorSubject é o "coração" reativo.
  // Ele guarda a lista de colunas e avisa a todos quando ela muda.
  private board = new BehaviorSubject<Coluna[]>(this.mockColunas);

  constructor() {}

  // (READ) - Função para os componentes "assistirem" às mudanças
  getBoardState(): Observable<Coluna[]> {
    return this.board.asObservable();
  }

  // (CREATE) - Função que o CardCreator vai chamar
  addTarefa(novaTarefa: Partial<Tarefa>) {
    // Pega o estado atual do quadro
    const colunasAtuais = [...this.board.value];

    // Encontra a coluna "A Fazer" (ordem 1)
    const colunaToDo = colunasAtuais.find((col) => col.ordem === 1);

    if (colunaToDo) {
      // Simula a API: cria um ID e adiciona a tarefa
      const tarefaCompleta: Tarefa = {
        ...novaTarefa,
        id: Math.floor(Math.random() * 10000), // ID falso
        coluna: colunaToDo.id,
      } as Tarefa;

      colunaToDo.tarefas.push(tarefaCompleta);

      // AVISA TODOS OS "ASSINANTES" que o quadro mudou!
      this.board.next(colunasAtuais);
    }
  }

  // (DELETE) - Função que o TaskCard vai chamar
  deleteTarefa(tarefaId: number, colunaId: number) {
    const colunasAtuais = [...this.board.value];
    const coluna = colunasAtuais.find((col) => col.id === colunaId);

    if (coluna) {
      // Filtra a tarefa, removendo-a da lista
      coluna.tarefas = coluna.tarefas.filter((task) => task.id !== tarefaId);

      // 5. AVISA TODOS OS "ASSINANTES"
      this.board.next(colunasAtuais);
    }
  }
}
