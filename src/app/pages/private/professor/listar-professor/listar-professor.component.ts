import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  constructor(private service: ProfessorService, private toastr: ToastrService) { }

  listaProfessor: Professor[]
  listaCurso: Curso[]
  professor: Professor
  userId: number
  usuario = JSON.parse(localStorage.getItem('user'))
  professorLogado: Professor
  validador: boolean = false

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.nullValidator),
  });

  ngOnInit(): void {
    let profLogado
    this.service.listar().subscribe(professor =>{
      this.listaProfessor = professor
      profLogado = professor.filter(
        professor => professor.email === this.usuario.email
      )
      this.professorLogado = profLogado[0]
    })
  }

  abrirEditar = (id:number) =>{
    this.service.obter(id).subscribe((professor) =>{
      this.professor = professor
      this.cadastroForm.setValue({
        nome: professor.nome,
        email: professor.email,
        senha: ''
      })
    })
    this.userId = id
  }
  
  editarProfessor(){
    if(this.cadastroForm.get('senha').value == ''){
      this.professor = {
        id: this.userId,
        nome: this.cadastroForm.get('nome').value,
        email: this.professor.email
      }
    }else{
      this.professor = {
        id: this.userId,
        nome: this.cadastroForm.get('nome').value,
        email: this.professor.email,
        senha: this.cadastroForm.get('senha').value
      }
    }
    this.service.alterar(this.professor).subscribe(
      (sucess) =>{
        this.toastr.success('Usuario alterado com sucesso')
        this.ngOnInit
      },
      (error) => alert('Não foi possível alterar usuario: ' + error.message)
    )
  }

  excluirProfessor = (id: number) => {
    if(this.validador){
      this.toastr.error('Você não pode exluir este professor pois ele tem cursos atrelados')
    }else{
      this.service.excluir(id).subscribe((retorno) => {
        this.toastr.success('Usuario excluido com sucesso')
        this.ngOnInit()
      },(err)=>{
        this.toastr.error(err.error.message)
      })
    }
    
  }

  validarProfessorCurso(id: number){
    if(this.professorLogado.id != id){
      this.excluirProfessor(id)
    }else{
      this.toastr.error('Você não pode excluir a si mesmo')
    }
  }
}
