import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coluna } from '../models/coluna.model';

@Injectable({
    providedIn: 'root'
})
export class ColunaService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://api.example.com/api/colunas/';

    listColunas(): Observable<Coluna[]> {
        return this.http.get<Coluna[]>(this.apiUrl)
        .pipe(catchError(err=> throwError (() => err)));
    }

    getColunaById(id: number): Observable<Coluna> {
        return this.http.get<Coluna>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

    createColuna(coluna: Coluna): Observable<Coluna>{
        return this.http.post<Coluna>(this.apiUrl, coluna)
        .pipe(catchError(err => throwError(() => err)));
    }

    updateColuna(coluna: Coluna): Observable<Coluna>{
        return this.http.put<Coluna>(`${this.apiUrl}${coluna.id}/`, coluna)
        .pipe(catchError(err => throwError(() => err)));
    }
    
    deleteColuna(id:number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

}