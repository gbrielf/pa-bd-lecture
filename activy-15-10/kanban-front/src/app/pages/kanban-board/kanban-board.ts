import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { BoardStateService } from '../../core/services/board-state';
import { Coluna } from '../../core/models/coluna.model';
import { Column } from '../../components/column/column';

@Component({
  selector: 'app-kanban-board',
  imports: [CommonModule, Column],
  templateUrl: './kanban-board.html',
  styleUrls: ['./kanban-board.css'],
  standalone: true,
})
export class KanbanBoard {
  // Injete o "Cérebro"
  private boardStateService = inject(BoardStateService);

  // NÃO guarde a lista aqui. Guarde o "canal" (Observable)
  protected colunasDoQuadro$: Observable<Coluna[]>;

  constructor() {
    // "Assine" o canal
    this.colunasDoQuadro$ = this.boardStateService.getBoardState();
  }
}
