import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import {Etiqueta} from '../../core/models/etiqueta.model';


@Component({
  selector: 'app-task-card',
  imports: [TagModule, InputTextModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css'
})
export class TaskCard {
  @Input() titulo!: string;
  @Input() descricao!: string;
  @Input() responsavel!: number;
  @Input() criador!: number;
  @Input() prioridade!: string;
  @Input() tags!: Etiqueta[];
}
