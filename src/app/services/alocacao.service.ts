import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAlocacaoDto } from '../models/create-alocacao.dto';

@Injectable({
  providedIn: 'root',
})
export class AlocacaoService {
  private apiUrl = `${environment.apiUrl}/alocacao`;

  constructor(private http: HttpClient) {}

  createAlocacao(dto: CreateAlocacaoDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, dto);
  }
}
