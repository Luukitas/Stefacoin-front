import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-cadastro-curso',
  templateUrl: './cadastro-curso.component.html',
  styleUrls: ['./cadastro-curso.component.css']
})
export class CadastroCursoComponent implements OnInit {

  constructor(private service: CursoService, private toastr: ToastrService, private route: Router) { }

  curso: Curso;
  retorno: any

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  cadastrarCurso(){
    this.curso = {
      nome: this.cadastroForm.get('nome')?.value,
      descricao: this.cadastroForm.get('descricao')?.value,
      idProfessor: 0,
      aulas: []
    }
    console.log(this.curso)
    this.service.incluir(this.curso).subscribe(retorno => {
      this.toastr.success('Curso cadastrado com sucesso')
      this.retorno = {
        mensagem: retorno.mensagem,
        data: retorno.data
      }
      this.route.navigate([`/curso/${this.retorno.data.id}`])
    },(err) => {
      this.toastr.error(err.error.message);
    });
  }

}
