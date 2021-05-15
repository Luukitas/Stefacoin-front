import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from '../models/aula';
import { Mensagem } from '../models/mensagem';

const URL = 'http://localhost:3000/stefanini';

@Injectable({
  providedIn: 'root'
})
export class AulaService {


  constructor(private httpClient: HttpClient) { }
  listar(): Observable<Aula[]> {
    return this.httpClient.get<Aula[]>(`${URL}/aula`);
  }

  obter(id: number, idCurso?: number): Observable<Aula> {
    console.log(`${URL}/aula/${id}/?idCurso=${idCurso}`)
    return this.httpClient.get<Aula>(`${URL}/aula/${id}/?idCurso=${idCurso}`)
  }

  incluir(aula: Aula): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}/aula`, aula);
  }

  alterar(aula: Aula): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(`${URL}/aula/${aula.id}`, aula)
  }

  excluir(id: number, idCurso?: number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(`${URL}/aula/${id}/?idCurso=${idCurso}`)
  }
}
