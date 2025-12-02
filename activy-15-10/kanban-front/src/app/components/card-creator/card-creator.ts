import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Tarefa } from '../../core/models/tarefa.model';
import { TarefaService } from '../../core/services/tarefa.service';
import {BoardStateService} from '../../core/services/board-state';
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

  private tarefaService = inject(TarefaService);
  private boardStateService = inject(BoardStateService);

  onSubmit(): void{
    if(this.novaTarefaForm.valid){
      console.log('Formulário válido. Enviando para a API real...');
      // Pega os valores do formulário
      const novaTarefa = this.novaTarefaForm.value as Partial<Tarefa>;
      
      // Garantir que IDs numéricos sejam números (os inputs são text)
      if (novaTarefa.responsavel != null) {
        const n = Number(novaTarefa.responsavel);
        novaTarefa.responsavel = Number.isNaN(n) ? novaTarefa.responsavel : n;
      }
      if (novaTarefa.criador != null) {
        const n = Number(novaTarefa.criador);
        novaTarefa.criador = Number.isNaN(n) ? novaTarefa.criador : n;
      }

      // Chama o BoardStateService que agora usa a API real
      this.boardStateService.addTarefa(novaTarefa);

      // Limpa o formulário para a próxima vez
      this.novaTarefaForm.reset();
      this.novaTarefaForm.patchValue({ prioridade: 'Média' }); // Reseta o valor padrão

      // Redireciona de volta para o Kanban
      this.router.navigate(['/kanban']);
    } else {
      // Se o formulário for inválido (ex: título em branco)
      console.error('Formulário inválido!');
      // Marca todos os campos como "tocados" para exibir as mensagens de erro
      this.novaTarefaForm.markAllAsTouched();
    }
    
  }

  // --- Definição do Formulário ---

  // Os nomes (chaves) aqui batem com o model 'Tarefa'
  protected novaTarefaForm = this.fb.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: [null],
    criador: [null, Validators.required], // (No futuro, isso virá do usuário logado)
    prioridade: ['Média', Validators.required],
    coluna: [1] // Por enquanto, sempre cria na primeira coluna (A Fazer)
    // tags: [[]] // (Simplificado por enquanto)
  });
}