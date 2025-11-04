import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { TarefaService } from '../../core/services/tarefa.service';
import {BoardStateService} from '../../core/services/board-state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-creator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './card-creator.html',
  styleUrls: ['./card-creator.css'],
})
export class CardCreatorComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private tarefaService: inject(TarefaService);
  private boardStateService = inject(BoardStateService);

  onSubmit(): void{
    if(this.novaTarefaForm.valid){
      console.log('Formulário válido. Enviando para a API real...');
      const novaTarefa = this.novaTarefaForm.value as Partial<Tarefa>;

      this.tarefaService.createTarefa(novaTarefa).subscribe({
        next: (tarefaCriada) => {
          console.log('API respondeu com sucesso:', tarefaCriadaApi);

          this.boardStateService.addTarefa(tarefaCriadaApi);

          this.novaTarefaForm.reset();
          this.novaTarefaForm.patchValue({ prioridade: 'Média' });
          this.router.navigate(['/kanban']);
        }
        error: (err) => {
          console.error('Erro ao criar tarefa via API:', err);
        }
    });}else{
      console.error('Formulário inválido!');
      this.novaTarefaForm.markAllAsTouched();
    }
    
  }

  // (Não se esqueça de mudar isso para a sua URL real do Django!)
  private readonly apiUrl = 'http://localhost:8000/kanban_api/tarefas/';

  protected novaTarefaForm = this.fb.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: [null],
    criador: [null, Validators.required],
    prioridade: ['Média', Validators.required],
    // tags: [[]]
    // Vamos simplificar por agora, Django vai tratar isso
  });
}