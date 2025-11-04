import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { Column } from '../../components/column/column';

@Component({
  selector: 'app-kanban-board',
  imports: [InputTextModule, ButtonModule, ChartModule, MenubarModule, Column, CommonModule, ],
  templateUrl: './kanban-board.html',
  standalone: true
})
export class KanbanBoard {
  colunasDoQuadro$: Observable<any[]> = of([]);
}
