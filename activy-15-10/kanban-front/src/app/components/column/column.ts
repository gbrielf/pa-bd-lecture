import { Component, Input } from '@angular/core';
import { TaskCard } from '../task-card/task-card';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../core/models/tarefa.model';

@Component({
  selector: 'app-column',
  imports: [TaskCard, CommonModule],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
  standalone: true
})
export class Column {
  @Input() titulo!: string;
  @Input() ordem!: number;
  @Input() projeto!: string;

  @Input() tasks: Tarefa[] = []; 
}
