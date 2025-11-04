import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../core/models/tarefa.model';
import { TaskCard } from '../task-card/task-card';

@Component({
  selector: 'app-column',
  imports: [ CommonModule, TaskCard],
  templateUrl: './column.html',
  styleUrls: ['./column.css'],
  standalone: true
})
export class Column {
  @Input() coluna: any; // garantir que o nome bate com [coluna]="col"
  @Input() titulo!: string;
  @Input() ordem!: number;
  @Input() projeto!: string;
  @Input() tasks: Tarefa[] = []; 
}
