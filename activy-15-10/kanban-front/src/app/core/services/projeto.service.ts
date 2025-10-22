import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Projeto } from '../models/projeto.model';

@Injectable({
    providedIn: 'root'
})
export class ProjetoService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://api.example.com/api/projetos/';

    listProjetos(): Observable<Projeto[]> {
        return this.http.get<Projeto[]>(this.apiUrl)
        .pipe(catchError(err=> throwError (() => err)));
    }

    getProjetoById(id: number): Observable<Projeto> {
        return this.http.get<Projeto>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

    createProjeto(projeto: Projeto): Observable<Projeto>{
        return this.http.post<Projeto>(this.apiUrl, projeto)
        .pipe(catchError(err => throwError(() => err)));
    }

    updateProjeto(projeto: Projeto): Observable<Projeto>{
        return this.http.put<Projeto>(`${this.apiUrl}${projeto.id}/`, projeto)
        .pipe(catchError(err => throwError(() => err)));
    }
    
    deleteProjeto(id:number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

}