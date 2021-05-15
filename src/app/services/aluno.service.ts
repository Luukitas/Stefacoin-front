import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno';
import { Mensagem } from '../models/mensagem';

const URL = 'http://localhost:3000/stefanini';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private httpClient: HttpClient) {}

  // #pegabandeira
  listar(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(`${URL}/aluno`);
  }

  obter(id: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${URL}/aluno/${id}`)
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/cadastro/aluno`, aluno);
  }

  alterar(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/aluno/${aluno.id}`, aluno)
  }

  excluir(id: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/aluno/${id}`)
  }
}
