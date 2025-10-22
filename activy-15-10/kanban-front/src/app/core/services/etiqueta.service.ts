import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etiqueta } from '../models/etiqueta.model';

@Injectable({
    providedIn: 'root'
})
export class EtiquetaService{
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'https://api.example.com/api/etiquetas/';

    listEtiquetas(): Observable<Etiqueta[]> {
        return this.http.get<Etiqueta[]>(this.apiUrl)
        .pipe(catchError(err=> throwError (() => err)));
    }

    getEtiquetaById(id: number): Observable<Etiqueta> {
        return this.http.get<Etiqueta>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

    createEtiqueta(etiqueta: Etiqueta): Observable<Etiqueta>{
        return this.http.post<Etiqueta>(this.apiUrl, etiqueta)
        .pipe(catchError(err => throwError(() => err)));
    }

    updateEtiqueta(etiqueta: Etiqueta): Observable<Etiqueta>{
        return this.http.put<Etiqueta>(`${this.apiUrl}${etiqueta.id}/`, etiqueta)
        .pipe(catchError(err => throwError(() => err)));
    }
    
    deleteEtiqueta(id:number): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}${id}/`)
        .pipe(catchError(err => throwError(() => err)));
    }

}