import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  constructor(private toastr: ToastrService, private auth: AuthService, private service: CursoService, private route: Router, private alunoService: AlunoService) { }

  listaCurso: Curso[]
  listaAlunos: Aluno[]
  curso: Curso
  aluno: Aluno

  usuario = JSON.parse(localStorage.getItem('user'))

  ngOnInit(): void {
    this.service.listar().subscribe(cursos => {
      this.listaCurso = cursos
    })
  }

  navegar(id: number){
    this.route.navigate([`/curso/${id}`])
  }

  matricularEmCurso(curso: Curso){
    let valid = 0
    this.alunoService.listar().subscribe(retorno => {
      this.listaAlunos = retorno.filter(
        aluno => aluno.email === this.usuario.email
      )
      this.aluno = this.listaAlunos[0]
      if(this.aluno.cursos != undefined){
        for(let c of this.aluno.cursos){
          if(curso.id == c.id){
            this.toastr.error('Você já esta cadastrado neste curso')
            valid = 1
            break;
          }
        }
      }
      if(this.aluno.cursos == undefined){
        this.aluno.cursos = []
      }
      if(valid == 0){
        this.aluno.cursos.push(curso)
        this.alunoService.alterar(this.aluno).subscribe(retorno => {
          this.toastr.success("Matriculado com sucesso")
          this.route.navigate([''])
        })
      }
    })
  }

}
