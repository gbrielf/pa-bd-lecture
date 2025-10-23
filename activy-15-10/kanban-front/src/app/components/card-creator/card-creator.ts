import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

// 👇 PASSO 1: Importe o seu service
import { TarefaService } from '../../core/services/tarefa.service';

@Component({
  selector: 'app-card-creator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './card-creator.html',
  styleUrls: ['./card-creator.css'],
})
export class CardCreatorComponent {
  private fb = inject(FormBuilder);

  // 👇 PASSO 2: Injete o service
  private tarefaService = inject(TarefaService);

  // (Não se esqueça de mudar isso para a sua URL real do Django!)
  private readonly apiUrl = 'http://localhost:8000/api/tarefas/';

  protected novaTarefaForm = this.fb.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: [null],
    criador: [null, Validators.required],
    prioridade: ['Média', Validators.required],
    // tags: [[]]
    // Vamos simplificar por agora, Django vai tratar isso
  });

  onSubmit(): void {
    if (this.novaTarefaForm.valid) {
      console.log('Enviando para API:', this.novaTarefaForm.value);

      // 👇 PASSO 3: Chame o service!
      // Usamos 'as any' por enquanto, pois o form não tem TODOS os campos do model
      this.tarefaService.createTarefa(this.novaTarefaForm.value as any).subscribe({
        next: (tarefaCriada) => {
          console.log('Tarefa criada com sucesso!', tarefaCriada);
          // Limpa o formulário para a próxima tarefa
          this.novaTarefaForm.reset();
          // Define os valores padrão de novo
          this.novaTarefaForm.patchValue({ prioridade: 'Média' });

          // (FUTURO: usar @Output para avisar a Coluna que a tarefa foi criada)
        },

        error: (err) => {
          console.error('Falha ao criar tarefa', err);
          // (Aqui você pode mostrar uma mensagem de erro para o usuário)
        },
      });
    } else {
      console.error('Formulário inválido!');
      this.novaTarefaForm.markAllAsTouched();
    }
  }
}
