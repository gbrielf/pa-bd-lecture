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
    console.log('BoardStateService.addTarefa chamado com:', novaTarefa);
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
      console.log('Nova tarefa adicionada na coluna', colunaToDo.id, tarefaCompleta);
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

  // (UPDATE/MOVE) - Move uma tarefa de uma coluna para outra
  moveTarefa(tarefaId: number, toColunaId: number) {
    const colunasAtuais = [...this.board.value];

    // Encontra a coluna de origem e a tarefa
    const fromColuna = colunasAtuais.find((c) => c.tarefas.some((t) => t.id === tarefaId));
    if (!fromColuna) {
      console.warn('moveTarefa: coluna de origem não encontrada para tarefa', tarefaId);
      return;
    }

    const tarefa = fromColuna.tarefas.find((t) => t.id === tarefaId);
    if (!tarefa) return;

    // Remove da coluna de origem
    fromColuna.tarefas = fromColuna.tarefas.filter((t) => t.id !== tarefaId);

    // Encontra coluna de destino
    const toColuna = colunasAtuais.find((c) => c.id === toColunaId);
    if (!toColuna) {
      console.warn('moveTarefa: coluna de destino não encontrada', toColunaId);
      // restaurar (colocar de volta) para evitar perda
      fromColuna.tarefas.push(tarefa);
      return;
    }

    // Atualiza propriedade de coluna na tarefa e adiciona na coluna destino
    tarefa.coluna = toColunaId;
    toColuna.tarefas.push(tarefa);

    console.log('moveTarefa: tarefa', tarefaId, 'movida para coluna', toColunaId);

    // Notifica assinantes
    this.board.next(colunasAtuais);
  }

  // Retorna o id da próxima coluna (ordem superior). Se for a última, retorna null.
  getNextColumnId(currentColunaId: number): number | null {
    const cols = this.board.value;
    const index = cols.findIndex((c) => c.id === currentColunaId);
    if (index === -1) return null;
    const next = cols[index + 1];
    return next ? next.id : null;
  }

  // Move uma tarefa para a próxima coluna (se existir)
  moveTarefaToNext(tarefaId: number, currentColunaId: number) {
    const nextId = this.getNextColumnId(currentColunaId);
    if (nextId == null) {
      console.warn('moveTarefaToNext: não existe próxima coluna para', currentColunaId);
      return;
    }
    this.moveTarefa(tarefaId, nextId);
  }
}
