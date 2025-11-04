import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { Coluna } from '../models/coluna.model';
import { Tarefa } from '../models/tarefa.model';

import { TarefaService } from './tarefa.service';
import { ColunaService } from './coluna.service';

@Injectable({
  providedIn: 'root',
})
export class BoardStateService {
  // 1. DADOS MOCK ( "API" Improvisada até integrar front e back)
  private tarefaService = inject(TarefaService);
  private colunaService = inject(ColunaService);
  // O BehaviorSubject é o "coração" reativo.
  // Ele guarda a lista de colunas e avisa a todos quando ela muda.
  private board = new BehaviorSubject<Coluna[]>([]);

  constructor() {
    this.loadInitialBoard();
    //serve para o cérebro procurar dados reais na API
  }

  // (READ) - Função para os componentes "assistirem" às mudanças
  getBoardState(): Observable<Coluna[]> {
    return this.board.asObservable();
  }

  loadInitialBoard() {
    // Usaremos forkJoin para buscar colunas e tarefas simultaneamente
    forkJoin({
      colunas: this.colunaService.listColunas(),
      tarefas: this.tarefaService.listTarefas(),
    }).subscribe(({ colunas, tarefas }) => {
        //casa as colunas com as tarefas
        const colunasComTarefas = colunas.map(coluna => ({
            ...coluna,
            //filtra as tarefas que pertencem a essa coluna
            tarefas: tarefas.filter(tarefa => tarefa.coluna === coluna.id)
        }));
        // avisa todos os assinantes com os dados da API
        this.board.next(colunasComTarefas);
      });
    }
  // (CREATE) - Função que o CardCreator vai chamar
  addTarefa(novaTarefa: Tarefa) {
    // Pega o estado atual do quadro
    const colunasAtuais = [...this.board.value];
    const colunaToDo = colunasAtuais.find((col) => col.id === novaTarefa.coluna);
    // Encontra a coluna "A Fazer" (ordem 1)
    // const colunaToDo = colunasAtuais.find((col) => col.ordem === 1);

    if (colunaToDo) {
      // Simula a API: cria um ID e adiciona a tarefa
      colunaToDo.tarefas.push(novaTarefa);
      // AVISA TODOS OS "ASSINANTES" que o quadro mudou!
      this.board.next(colunasAtuais);
    }else{
      this.loadInitialBoard();
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

  // remover do cache
  deleteTarefaDoCache(tarefaId: number, colunaId: number){
    const colunasAtuais = [...this.board.value];
    const coluna = colunasAtuais.find((col) => col.id === colunaId);
    
    if (coluna) {
      // Filtra a tarefa, removendo-a da lista
      coluna.tarefas = coluna.tarefas.filter((task) => task.id !== tarefaId);
      this.board.next(colunasAtuais);
    }
}
}