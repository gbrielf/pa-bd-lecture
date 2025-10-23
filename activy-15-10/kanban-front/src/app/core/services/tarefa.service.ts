import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.example.com/api/tarefas/';

  listTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl).pipe(catchError((err) => throwError(() => err)));
  }

  getTarefaById(id: number): Observable<Tarefa> {
    return this.http
      .get<Tarefa>(`${this.apiUrl}${id}/`)
      .pipe(catchError((err) => throwError(() => err)));
  }

  createTarefa(tarefa: Partial<Tarefa>): Observable<Tarefa> {
    return this.http
      .post<Tarefa>(this.apiUrl, tarefa)
      .pipe(catchError((err) => throwError(() => err)));
  }

  updateTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http
      .put<Tarefa>(`${this.apiUrl}${tarefa.id}/`, tarefa)
      .pipe(catchError((err) => throwError(() => err)));
  }

  patchTarefa(id: number, mudancas: Partial<Tarefa>): Observable<Tarefa> {
    return this.http
      .patch<Tarefa>(`${this.apiUrl}${id}/`, mudancas)
      .pipe(catchError((err) => throwError(() => err)));
  }

  deleteTarefa(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}${id}/`)
      .pipe(catchError((err) => throwError(() => err)));
  }
}