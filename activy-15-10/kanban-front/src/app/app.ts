import { Component, OnInit } from '@angular/core'; // Remova 'inject' daqui
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
// 1. Importe SÓ o CardCreator
// (Ajuste o caminho se o nome do arquivo for card-creator.component.ts)

@Component({
  standalone: true,
  selector: 'app-root',
  // 2. Imports é SÓ o CommonModule e o CardCreator
  imports: [CommonModule, RouterOutlet, MenubarModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected items: MenuItem[] = [];

  ngOnInit(){
    this.items = [
      {label: 'Kanban',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ['/kanban']
      },
      {
        label: 'Criar Tarefa',
        icon: 'pi pi-fw pi-plus',
        routerLink: ['/criar-tarefa']
      }
    ];
  }
}
