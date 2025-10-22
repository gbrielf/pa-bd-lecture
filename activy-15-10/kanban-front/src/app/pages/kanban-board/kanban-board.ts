import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-kanban-board',
  imports: [InputTextModule, ButtonModule, ChartModule, MenubarModule],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css'
})
export class KanbanBoard {

}
