import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(`${URL}/professor`);
  }

  obter(id: number): Observable<Professor> {
    return this.httpClient.get<Professor>(`${URL}/professor/${id}`)
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/cadastro/professor`, professor);
  }

  alterar(professor: Professor): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/professor/${professor.id}`, professor)
  }

  excluir(id: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/professor/${id}`)
  }
}
