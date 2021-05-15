import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-detalhes-aluno',
  templateUrl: './detalhes-aluno.component.html',
  styleUrls: ['./detalhes-aluno.component.css']
})
export class DetalhesAlunoComponent implements OnInit {

  constructor(private auth: AuthService, private service: AlunoService, private toastr: ToastrService, private router: Router) { }

  usuario = JSON.parse(localStorage.getItem('user'))
  listaAlunos: Aluno[]  
  aluno: Aluno
  userId: number

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.nullValidator),
    formacao: new FormControl('', Validators.nullValidator),
    idade: new FormControl('', Validators.nullValidator),
    cursos: new FormControl('', Validators.nullValidator)
  });

  ngOnInit(): void {
    this.service.listar().subscribe(aluno => {
      this.listaAlunos = aluno.filter(
        aluno => aluno.email === this.usuario.email
      )
      this.aluno = this.listaAlunos[0]
      console.log(this.aluno)
    })
  }

  abrirEditar = (id:number) =>{
    this.service.obter(id).subscribe((aluno) =>{
      this.cadastroForm.setValue({
        nome: aluno.nome,
        senha: '',
        formacao: aluno.formacao,
        idade: aluno.idade,
        cursos: ''
      })
      this.aluno.email = aluno.email
    })
    this.userId = id
  }

  editarAluno = () => {
    if(this.cadastroForm.get('senha').value == ''){
      this.aluno = {
        id: this.userId,
        nome: this.cadastroForm.get('nome').value,
        email: this.aluno.email,  
        formacao: this.cadastroForm.get('formacao').value,
        idade: this.cadastroForm.get('idade').value
      }
    }else{
      this.aluno = {
        id: this.userId,
        nome: this.cadastroForm.get('nome').value,
        email: this.aluno.email,  
        senha: this.cadastroForm.get('senha').value,
        formacao: this.cadastroForm.get('formacao').value,
        idade: this.cadastroForm.get('idade').value
      }
    }
    this.auth.auth(this.aluno.email, this.aluno.senha)
    this.service.alterar(this.aluno).subscribe((retorno)=>{
      this.toastr.success('Usuario alterado com sucesso')
      document.getElementById("botaoEditar").classList.remove("show") 
      this.ngOnInit()
    })
  }

  excluirAluno = (id: number) => {
    
    this.service.excluir(id).subscribe((retorno) => {
      this.toastr.success('Usuario excluido com sucesso')
      this.auth.logout()
    })
    this.ngOnInit()
    
  }

  irPaginaCurso(id: number){
    this.router.navigate([`/curso/${id}`])
  }

  desmatricular(index: number){
    this.aluno.cursos.pop(index)
    this.service.alterar(this.aluno).subscribe((retorno) => {
      this.toastr.success("Desmatriculado com sucesso")
      this.ngOnInit()
    })
  }
}
