import { Routes } from '@angular/router';
import { KanbanBoard } from './pages/kanban-board/kanban-board';
import { CardCreatorComponent } from './components/card-creator/card-creator';

export const routes: Routes = [
    // Rota padrão: se a URL estiver vazia, redireciona para /kanban
    {
        path: '',
        redirectTo: '/kanban',
        pathMatch: 'full'
    },
    //Rota do Kanban: quando a URL for /kanban, mostre o KanbanBoardComponent
    {
        path: 'kanban',
        component: KanbanBoard
    },
    // Rota de Criar: quando a URL for /criar-tarefa, mostre o CardCreatorComponent
    {
        path: 'criar-tarefa',
        component: CardCreatorComponent
    }
];
