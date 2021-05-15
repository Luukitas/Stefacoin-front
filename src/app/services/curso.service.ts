import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso';
import { Mensagem } from '../models/mensagem';

const URL = 'http://localhost:3000/stefanini';

@Injectable({
  providedIn: 'root'
})


export class CursoService {

  constructor(private httpClient: HttpClient) { }
  listar(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${URL}/curso`);
  }

  obter(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${URL}/curso/${id}`)
  }

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/curso`, curso);
  }

  alterar(curso: Curso): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/curso/${curso.id}`, curso)
  }

  excluir(id: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/curso/${id}`)
  }
}
