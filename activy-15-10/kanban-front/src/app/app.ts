import { TaskCard } from './components/task-card/task-card';
import { Component, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [TaskCard],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('kanban-front');
}
