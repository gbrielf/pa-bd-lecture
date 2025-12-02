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
  private tarefaService = inject(TarefaService);
  private colunaService = inject(ColunaService);
  
  // O BehaviorSubject é o "coração" reativo.
  // Ele guarda a lista de colunas e avisa a todos quando ela muda.
  private board = new BehaviorSubject<Coluna[]>([]);

  constructor() {
    this.loadInitialBoard();
  }

  // (READ) - Função para os componentes "assistirem" às mudanças
  getBoardState(): Observable<Coluna[]> {
    return this.board.asObservable();
  }

  loadInitialBoard() {
    // Busca colunas e tarefas da API real
    forkJoin({
      colunas: this.colunaService.listColunas(),
      tarefas: this.tarefaService.listTarefas(),
    }).subscribe({
      next: ({ colunas, tarefas }) => {
        // Casa as colunas com as tarefas
        const colunasComTarefas = colunas.map(coluna => ({
          ...coluna,
          // Filtra as tarefas que pertencem a essa coluna
          tarefas: tarefas.filter(tarefa => tarefa.coluna === coluna.id)
        }));
        // Ordena colunas por ordem
        colunasComTarefas.sort((a, b) => a.ordem - b.ordem);
        // Avisa todos os assinantes com os dados da API
        this.board.next(colunasComTarefas);
      },
      error: (error) => {
        console.error('Erro ao carregar dados do board:', error);
        // Em caso de erro, define um board vazio
        this.board.next([]);
      }
    });
  }

  // (CREATE) - Função que o CardCreator vai chamar
  addTarefa(novaTarefa: Partial<Tarefa>) {
    // Cria a tarefa na API
    this.tarefaService.createTarefa(novaTarefa).subscribe({
      next: (tarefaCriada) => {
        // Adiciona a tarefa ao cache local
        this.addTarefaToCache(tarefaCriada);
        console.log('✅ Tarefa criada com sucesso:', tarefaCriada);
      },
      error: (error) => {
        console.error('❌ Erro ao criar tarefa:', error);
        // Em caso de erro, recarrega o board
        this.loadInitialBoard();
      }
    });
  }

  // Adiciona tarefa ao cache local
  private addTarefaToCache(tarefa: Tarefa) {
    const colunasAtuais = [...this.board.value];
    const coluna = colunasAtuais.find((col) => col.id === tarefa.coluna);

    if (coluna) {
      coluna.tarefas.push(tarefa);
      this.board.next(colunasAtuais);
    } else {
      // Se não encontrar a coluna, recarrega tudo
      this.loadInitialBoard();
    }
  }

  // (DELETE) - Função que o TaskCard vai chamar
  deleteTarefa(tarefaId: number, colunaId: number) {
    // Remove da API
    this.tarefaService.deleteTarefa(tarefaId).subscribe({
      next: () => {
        // Remove do cache local
        this.deleteTarefaDoCache(tarefaId, colunaId);
        console.log('✅ Tarefa deletada com sucesso');
      },
      error: (error) => {
        console.error('❌ Erro ao deletar tarefa:', error);
        // Em caso de erro, recarrega o board
        this.loadInitialBoard();
      }
    });
  }

  // (UPDATE/MOVE) - Move uma tarefa de uma coluna para outra
  moveTarefa(tarefaId: number, toColunaId: number) {
    // Move na API
    this.tarefaService.moverTarefa(tarefaId, toColunaId).subscribe({
      next: (tarefaAtualizada) => {
        // Atualiza o cache local
        this.moveTarefaNoCache(tarefaId, toColunaId, tarefaAtualizada);
        console.log('✅ Tarefa movida com sucesso');
      },
      error: (error) => {
        console.error('❌ Erro ao mover tarefa:', error);
        // Em caso de erro, recarrega o board
        this.loadInitialBoard();
      }
    });
  }

  // Remove do cache local
  private deleteTarefaDoCache(tarefaId: number, colunaId: number) {
    const colunasAtuais = [...this.board.value];
    const coluna = colunasAtuais.find((col) => col.id === colunaId);
    
    if (coluna) {
      coluna.tarefas = coluna.tarefas.filter((task) => task.id !== tarefaId);
      this.board.next(colunasAtuais);
    }
  }

  // Move tarefa no cache local
  private moveTarefaNoCache(tarefaId: number, toColunaId: number, tarefaAtualizada?: Tarefa) {
    const colunasAtuais = [...this.board.value];

    // Encontra a coluna de origem e remove a tarefa
    const fromColuna = colunasAtuais.find((c) => c.tarefas.some((t) => t.id === tarefaId));
    if (!fromColuna) {
      console.warn('Coluna de origem não encontrada para tarefa', tarefaId);
      return;
    }

    const tarefa = fromColuna.tarefas.find((t) => t.id === tarefaId);
    if (!tarefa) return;

    // Remove da coluna de origem
    fromColuna.tarefas = fromColuna.tarefas.filter((t) => t.id !== tarefaId);

    // Encontra coluna de destino
    const toColuna = colunasAtuais.find((c) => c.id === toColunaId);
    if (!toColuna) {
      console.warn('Coluna de destino não encontrada', toColunaId);
      // Restaura na coluna original
      fromColuna.tarefas.push(tarefa);
      return;
    }

    // Atualiza a tarefa com dados da API se disponível
    const tarefaParaMover = tarefaAtualizada || { ...tarefa, coluna: toColunaId };
    toColuna.tarefas.push(tarefaParaMover);

    // Notifica assinantes
    this.board.next(colunasAtuais);
  }

  // Retorna todas as colunas disponíveis (útil para interfaces de seleção)
  getBoardColumns(): Coluna[] {
    return [...this.board.value];
  }

  // Retorna o id da próxima coluna (ordem superior). Se for a última, retorna null.
  getNextColumnId(currentColunaId: number): number | null {
    const cols = this.board.value;
    const index = cols.findIndex((c) => c.id === currentColunaId);
    if (index === -1) return null;
    const next = cols[index + 1];
    return next ? next.id : null;
  }

  // Retorna o id da coluna anterior (ordem inferior). Se for a primeira, retorna null.
  getPreviousColumnId(currentColunaId: number): number | null {
    const cols = this.board.value;
    const index = cols.findIndex((c) => c.id === currentColunaId);
    if (index === -1 || index === 0) return null;
    const previous = cols[index - 1];
    return previous ? previous.id : null;
  }
}