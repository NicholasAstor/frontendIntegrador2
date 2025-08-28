// src/app/notebook/notebook.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CreateNotebookDto, NotebookDto} from '../models/notebook.model';

@Injectable({ providedIn: 'root' })
export class NotebookService {
  private apiUrl = `${environment.apiUrl}/Notebook`;

  constructor(private http: HttpClient) {}

  cadastrarNotebook(dto: CreateNotebookDto): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, dto);
  }

  getAll(): Observable<NotebookDto[]> {
    return this.http.get<NotebookDto[]>(this.apiUrl);
  }

  getById(id: number): Observable<NotebookDto> {
    return this.http.get<NotebookDto>(`${this.apiUrl}/${id}`);
  }

  update(id: number, dto: CreateNotebookDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
