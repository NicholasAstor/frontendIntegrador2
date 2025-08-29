import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Funcionario {
  nome: string;
  matricula: number;
}
@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = `${environment.apiUrl}/funcionario`;

  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
