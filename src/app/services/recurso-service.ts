import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RecursoDto } from '../models/recurso-model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecursoService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/Home/recursos`;

  list(
    dataInicio?: string | null,
    dataFim?: string | null
  ): Observable<RecursoDto[]> {
    let params = new HttpParams();

    if (dataInicio) {
      params = params.set('dataInicio', `${dataInicio}T00:00:00.000Z`);
    }

    if (dataFim) {
      params = params.set('dataFim', `${dataFim}T23:59:59.999Z`);
    }

    return this.http.get<RecursoDto[]>(this.base, {
      params,
      headers: { Accept: 'application/json' },
    });
  }

  deleteNotebook(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/Notebook/${id}`);
  }
}
