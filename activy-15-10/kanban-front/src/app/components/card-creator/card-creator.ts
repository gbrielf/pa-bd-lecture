import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

// Service de Estado (Nosso "Cérebro" / CRUD falso)
import { BoardStateService } from '../../core/services/board-state';
// Service da API (Para amanhã)
import { TarefaService } from '../../core/services/tarefa.service';

// Model
import { Tarefa } from '../../core/models/tarefa.model';

@Component({
  selector: 'app-card-creator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './card-creator.html',
  styleUrls: ['./card-creator.css'],
})
export class CardCreatorComponent {
  // --- Injeção de Dependências ---

  // 1. O FormBuilder (Você tinha comentado esta linha!)
  private fb = inject(FormBuilder);

  // 2. Os Serviços que vamos usar
  private boardStateService = inject(BoardStateService); // O "Cérebro"
  private router = inject(Router); // Para navegar

  // (Este service fica guardado para amanhã, quando for conectar com a API)
  private tarefaService = inject(TarefaService);

  // --- Definição do Formulário ---

  // Os nomes (chaves) aqui batem com o model 'Tarefa'
  protected novaTarefaForm = this.fb.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: [null],
    criador: [null, Validators.required], // (No futuro, isso virá do usuário logado)
    prioridade: ['Média', Validators.required],
    // tags: [[]] // (Simplificado por enquanto)
  });

  // --- Ação de Envio ---

  onSubmit(): void {
    // 1. Verifica se os campos obrigatórios (titulo, criador) foram preenchidos
    if (this.novaTarefaForm.valid) {
      console.log('Formulário válido. Enviando para o "Cérebro"...');

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

      // 2. CHAMA O "CÉREBRO" (O CRUD FALSO)
      // (Amanhã, vamos "embrulhar" isso com a chamada real da API)
      this.boardStateService.addTarefa(novaTarefa);

      // 3. Limpa o formulário para a próxima vez
      this.novaTarefaForm.reset();
      this.novaTarefaForm.patchValue({ prioridade: 'Média' }); // Reseta o valor padrão

      // 4. MANDA O USUÁRIO DE VOLTA PARA O KANBAN!
      this.router.navigate(['/kanban']);
    } else {
      // Se o formulário for inválido (ex: título em branco)
      console.error('Formulário inválido!');
      // Marca todos os campos como "tocados" para exibir as mensagens de erro (ex: "Título é obrigatório")
      this.novaTarefaForm.markAllAsTouched();
    }
  }
}
