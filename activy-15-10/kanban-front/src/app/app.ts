import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCard } from './components/task-card/task-card';
import { Column } from './components/column/column';
import { KanbanBoard } from './pages/kanban-board/kanban-board';

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
