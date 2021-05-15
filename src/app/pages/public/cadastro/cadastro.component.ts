import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Professor } from 'src/app/models/professor';
import { AlunoService } from 'src/app/services/aluno.service';
import { ProfessorService } from 'src/app/services/professor.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private toastr: ToastrService, private profService: ProfessorService, private alunoService: AlunoService, private route: Router) { }

  professor: Professor
  aluno: Aluno
  botaoTipoCadastro: string = "Cadastro de Aluno"

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    formacao: new FormControl('', Validators.nullValidator),
    idade: new FormControl('', Validators.nullValidator),
    cursos: new FormControl('', Validators.nullValidator)
  });

  ngOnInit(): void {
  }

  cadastrar(tipo: number){
    if(tipo == 1){
      this.cadastroProfessor()
    }
    if(tipo == 2){
      this.cadastroAluno()
    }
  }

  cadastroProfessor(){
    this.professor = {
      nome: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value
    }
    console.log(this.professor)
    this.profService.incluir(this.professor).subscribe((mensagem) => {
      this.toastr.success('Usuario cadastrado com sucesso')
      this.route.navigate(['/login'])
    },(err) => {
      this.toastr.error(err.error.message);
    });

  }
  
  cadastroAluno(){
    this.aluno = {
      nome: this.cadastroForm.get('nome')?.value,
      email: this.cadastroForm.get('email')?.value,
      senha: this.cadastroForm.get('senha')?.value,
      idade: Number(this.cadastroForm.get('idade')?.value),
      formacao: this.cadastroForm.get('formacao')?.value
    }
    console.log(this.aluno)
    this.alunoService.incluir(this.aluno).subscribe((mensagem) => {
      this.toastr.success('Usuario cadastrado com sucesso')
      this.route.navigate(['/login'])
    },(err) => {
      this.toastr.error(err.error.message);
    });

  }

  mudarTipoCadastro(){
    if(this.botaoTipoCadastro == "Cadastro de Aluno"){
      document.getElementById('cadastroAluno').style.display = "flex";
      document.getElementById('cadastroProfessor').style.display = "none";
      this.botaoTipoCadastro = "Cadastro de Professor"
    }else{
      document.getElementById('cadastroAluno').style.display = "none";
      document.getElementById('cadastroProfessor').style.display = "flex";
      this.botaoTipoCadastro = "Cadastro de Aluno"
    }
  }

}
