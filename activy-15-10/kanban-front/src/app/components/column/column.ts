import { Component, Input } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { CommonModule } from '@angular/common';
import { Coluna } from '../../core/models/coluna.model';

@Component({
  selector: 'app-column',
  imports: [CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
  standalone: true,
})
export class Column {
  @Input() coluna: Coluna | null = null;
  // @Input() titulo!: string;
  // @Input() ordem!: number;
  // @Input() projeto!: string;
  // @Input() tasks: Tarefa[] = [];
}
