import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-cadastro-aula',
  templateUrl: './cadastro-aula.component.html',
  styleUrls: ['./cadastro-aula.component.css']
})
export class CadastroAulaComponent implements OnInit {

  constructor(private service: AulaService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  aula: Aula
  topicos: string[] = new Array()
  idCurso: number
  id?: number
  botaoCadastro: string = 'Cadastrar'

  cadastroForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    duracao: new FormControl('', Validators.required),
    topicos: new FormControl('', Validators.required),
  });


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idCurso = params['id']
      this.id = params['idAula']
      if(this.id){
        this.service.obter(this.id, this.idCurso).subscribe(retorno => {
          this.aula = retorno
          console.log(this.aula.duracao)
          this.cadastroForm.setValue({
            nome: this.aula.nome,
            duracao: Number(this.aula.duracao),
            topicos: ''
          })
          this.topicos = this.aula.topicos
          this.botaoCadastro = 'Alterar'
        })
      }
    })
  }

  cadastrarAula(){
    this.aula = {
      nome: this.cadastroForm.get('nome')?.value,
      duracao: Number(this.cadastroForm.get('duracao')?.value),
      idCurso: Number(this.idCurso),
      topicos: this.topicos
    }
    if(this.botaoCadastro == 'Cadastrar'){
      this.service.incluir(this.aula).subscribe(retorno => {
        this.toastr.success(retorno.mensagem)
        this.router.navigate([`/curso/${this.idCurso}`])
      },(err) => {
        this.toastr.error(err.error.message);
      });
    }else{
      this.editarAula(this.aula)
    }
  }

  adicionarTopico(){
    if(this.cadastroForm.get('topicos').value == ''){
      this.toastr.error('Digite um valor válido para o tópico')
    }else{
      this.topicos.push(this.cadastroForm.get('topicos').value)
      this.cadastroForm.setValue({
        topicos:''
      })
      this.cadastroForm.setValue({topicos: ""})
    }
  }

  editarAula(aula:Aula){
    this.service.alterar(aula).subscribe(retorno => {
      this.toastr.success(retorno.mensagem)
      this.router.navigate([`/curso/${this.id}`])
    }, err => {
      this.toastr.error(err.error.message)
    })
  }
}
