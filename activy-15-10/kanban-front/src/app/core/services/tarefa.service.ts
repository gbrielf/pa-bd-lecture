import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'https://api.example.com/api/tarefas/'; // Substituir pela URL real da API

  constructor(private http: HttpClient) {}

  getTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl);
  }

  getTarefaById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}${id}/`);
  }

  createTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}${tarefa.id}/`, tarefa);
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
}