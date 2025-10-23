import { Component } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';
import { Column } from '../../components/column/column';

@Component({
  selector: 'app-kanban-board',
  imports: [InputTextModule, ButtonModule, ChartModule, MenubarModule, TaskCard, Column],
  templateUrl: './kanban-board.html',
  styleUrls: ['./kanban-board.css'],
  standalone: true
})
export class KanbanBoard {

}
