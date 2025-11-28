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

    // Interface mais amigável para mover tarefa
    const colunas = this.boardStateService.getBoardColumns();
    const opcoesText = colunas
      .filter((col) => col.id !== this.colunaId) // Remove coluna atual das opções
      .map((col) => `${col.id}: ${col.titulo}`)
      .join('\n');
    
    const resposta = window.prompt(
      `Mover "${this.tarefa.titulo}" para qual coluna?\n\n${opcoesText}\n\nDigite o ID da coluna:`
    );
    
    if (!resposta) return;

    const destino = Number(resposta);
    if (Number.isNaN(destino)) {
      alert('ID de coluna inválido');
      return;
    }

    const colunaDestino = colunas.find((col) => col.id === destino);
    if (!colunaDestino) {
      alert('Coluna não encontrada');
      return;
    }

    this.boardStateService.moveTarefa(this.tarefa.id, destino);
    console.log(`✅ Tarefa "${this.tarefa.titulo}" movida para "${colunaDestino.titulo}"`);
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

  onVoltar() {
    if (!this.tarefa || this.colunaId == null) return;

    const previousId = this.boardStateService.getPreviousColumnId(this.colunaId);
    if (previousId == null) {
      // já está na primeira coluna
      alert('Não há coluna anterior para voltar.');
      return;
    }

    this.boardStateService.moveTarefa(this.tarefa.id, previousId);
  }
}
