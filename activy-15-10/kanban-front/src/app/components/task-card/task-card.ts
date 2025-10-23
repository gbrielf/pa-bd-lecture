import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; // opcional para botões depois
import { Etiqueta } from '../../core/models/etiqueta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCard {
  @Input() titulo: string = 'Título de exemplo';
  @Input() descricao: string = '';
  @Input() responsavel: number = 0;
  @Input() criador: number = 0;
  @Input() prioridade: string = 'low';
  @Input() tags: Etiqueta[] = [];
}
