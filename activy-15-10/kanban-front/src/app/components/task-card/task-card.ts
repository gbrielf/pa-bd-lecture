import { Component, ComponentFactoryResolver, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; // opcional para botões depois
import { Etiqueta } from '../../core/models/etiqueta.model';
import { CommonModule } from '@angular/common';
import { Tarefa } from '../../core/models/tarefa.model';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CardModule, TagModule, ButtonModule, CommonModule],
  templateUrl: './task-card.html',
  styleUrls: ['./task-card.css']
})
export class TaskCard {
  @Input() tarefa!: Tarefa;
  @Input() colunaId!: number;

  onEditar(){
    console.log('Lógica de editar tarefa aqui', this.tarefa?.id);
  }
  onExcluir(){
    //função do CRUD falso
    if (!this.tarefa) return;
    console.log('Excluindo tarefa:', this.tarefa.id, 'da coluna:', this.colunaId);
  }
  onPular(){
    console.log('Botão PULAR (next) clicando na tarefa:', this.tarefa?.id);
    // Lógica para mover a tarefa para a próxima coluna
  }
}
