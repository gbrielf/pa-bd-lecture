import { Column } from './components/column/column';
import { TaskCard } from './components/task-card/task-card';
import { Component, signal } from '@angular/core';
import { KanbanBoard } from './pages/kanban-board/kanban-board';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [TaskCard, Column, KanbanBoard, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('kanban-front');
}
