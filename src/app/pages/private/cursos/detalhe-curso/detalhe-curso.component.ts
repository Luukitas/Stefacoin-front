import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {

  constructor( private toastr: ToastrService, private route: ActivatedRoute, private router: Router, private cursoService: CursoService, private profService: ProfessorService, private alunoService: AlunoService) { }


  listaProfessor: Professor[]
  listaAlunos: Aluno[]
  professor: Professor
  aluno: Aluno
  curso: Curso;
  id: number;
  tipo: number;
  usuario = JSON.parse(localStorage.getItem('user'))
  notaCurso: number = 0
  valorNota: number
  avaliou: boolean = false

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    let x = 0
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.cursoService.obter(this.id).subscribe(curso => {
        this.curso = curso
        if(this.curso.idProfessor != 0){
          this.profService.obter(this.curso.idProfessor).subscribe(prof => {
            this.professor = prof
          })
        }
        this.alunoService.listar().subscribe(retorno => {
          this.listaAlunos = retorno.filter(
            aluno => aluno.email === this.usuario.email
          )
          this.aluno = this.listaAlunos[0]
          this.puxarNotaDoAluno()
        });
        for(let nota of this.curso.nota){
          x = x + Number(nota.nota)
        }
        this.notaCurso = (x/this.curso.nota.length)
      })
    });
    this.profService.listar().subscribe(prof => {
      this.listaProfessor = prof
    })
  }

  abrirEditar = (curso: Curso) =>{
    this.tipo = 1
    this.curso = curso
    this.cadastroForm.setValue({
      nome: curso.nome,
      descricao: curso.descricao
    })
    this.id = curso.id
  }

  editarCurso(curso?: Curso){
    if(curso){
      this.curso = curso
    }else{
      this.curso = {
        id: this.id,
        nome: this.cadastroForm.get('nome')?.value,
        descricao: this.cadastroForm.get('descricao')?.value,
        idProfessor: this.curso.idProfessor,
        aulas: this.curso.aulas
      }
    }
    this.cursoService.alterar(this.curso).subscribe((retorno)=>{
      this.toastr.success('Usuario alterado com sucesso')
      this.ngOnInit()
    }, (err)=>{
      this.toastr.error(err.error.message)
    })
  }

  excluirCurso = (id: number) => {
    this.cursoService.excluir(id).subscribe((retorno) => {
      this.toastr.success('Usuario excluido com sucesso')
      this.router.navigate(['/lista-curso'])
    }, (err) => {
      this.toastr.error(err.error.message)
    })
    this.ngOnInit()
  }

  abrirAdicionar(){
    this.tipo = 2
  }

  adicionarProfessor(id: number){
    this.curso = {
      id: this.id,
      nome: this.curso.nome,
      descricao: this.curso.nome,
      idProfessor: id,
      aulas: this.curso.aulas
    }
    this.editarCurso(this.curso)
  }

  cadastrarAula(){
    this.router.navigate([`/curso/${this.id}/cadastro-aula`])
  }

  detalhesAula(id: number){
    this.router.navigate([`/curso/${this.id}/detalhes-aula/${id}`])
  }

  avaliarCurso(){
    if(this.curso.nota == undefined){
      this.curso.nota = []
    }
    this.curso.nota.push({idAluno: this.aluno.id, nota: this.valorNota})
    this.cursoService.alterar(this.curso).subscribe(() => {
      this.toastr.success("Curso avaliado com sucesso")
      this.ngOnInit()
    })
  }

  puxarNotaDoAluno(){
    for(let c of this.curso.nota){
      if(c.idAluno == this.aluno.id){
        this.avaliou = true
        this.valorNota = c.nota
      }
    }
  }

}
