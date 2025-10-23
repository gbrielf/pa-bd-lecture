import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button'; // opcional para botões depois
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { Tarefa } from '../../core/models/tarefa.model';
import { BoardStateService } from '../../core/services/board-state';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css'],
})
export class TaskCard {
  @Input() tarefa!: Tarefa; // '!' diz ao TS "confia, vai chegar"
  @Input() colunaId!: number;
  // @Input() titulo: string = 'Título de exemplo';
  // @Input() descricao: string = '';
  // @Input() responsavel: number = 0;
  // @Input() criador: number = 0;
  // @Input() prioridade: string = 'low';
  // @Input() tags: Etiqueta[] = [];
  private boardStateService = inject(BoardStateService);

  onExcluir() {
    if (!this.tarefa) return;

    console.log('Excluindo tarefa:', this.tarefa.id, 'da coluna:', this.colunaId);
    this.boardStateService.deleteTarefa(this.tarefa.id, this.colunaId);
  }

  onEditar() {
    if (!this.tarefa) return;

    // Pergunta ao usuário o id da coluna de destino (simples prompt de dev)
    const resposta = window.prompt('Mover tarefa para coluna (informe o id da coluna):');
    if (!resposta) return;

    const destino = Number(resposta);
    if (Number.isNaN(destino)) {
      alert('ID de coluna inválido');
      return;
    }

    this.boardStateService.moveTarefa(this.tarefa.id, destino);
  }

  onPular() {
    if (!this.tarefa || this.colunaId == null) return;

    const nextId = this.boardStateService.getNextColumnId(this.colunaId);
    if (nextId == null) {
      // já está na última coluna
      alert('Não há próxima coluna para pular.');
      return;
    }

    this.boardStateService.moveTarefa(this.tarefa.id, nextId);
  }
}
