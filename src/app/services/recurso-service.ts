// src/app/services/recurso.service.ts
import {Injectable, inject, OnInit} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecursoDto } from '../models/recurso-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecursoService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/Home/recursos`;

  list(data?: string | null): Observable<RecursoDto[]> {
    let params = new HttpParams();
    const dateTimeString = `${data}T00:00:00.055Z`;
    if (data) params = params.set('data', dateTimeString);
    return this.http.get<RecursoDto[]>(this.base, {
      params,
      headers: { Accept: 'application/json' }
    });
  }


}
