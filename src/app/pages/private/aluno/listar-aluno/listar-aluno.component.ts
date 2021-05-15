import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {

  constructor(private service: AlunoService) { }

  listaAluno: Aluno[]
  aluno: Aluno

  ngOnInit(): void {
    this.service.listar().subscribe(aluno =>{
      this.listaAluno = aluno
    })
  }



}
