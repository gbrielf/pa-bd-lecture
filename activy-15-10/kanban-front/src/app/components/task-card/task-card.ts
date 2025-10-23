import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; // opcional para botões depois
import { Etiqueta } from '../../core/models/etiqueta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCard {
  @Input() titulo!: string;
  @Input() descricao!: string;
  @Input() responsavel!: string;
  @Input() criador!: string;
  @Input() prioridade!: string;
  @Input() tags: Etiqueta[] = [];
}
