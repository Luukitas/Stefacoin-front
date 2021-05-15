import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-detalhe-aula',
  templateUrl: './detalhe-aula.component.html',
  styleUrls: ['./detalhe-aula.component.css']
})
export class DetalheAulaComponent implements OnInit {

  constructor(private router: Router, private route:ActivatedRoute, private toastr: ToastrService, private service: AulaService) { }

  id: number
  idCurso: number
  aula: Aula
  usuario = JSON.parse(localStorage.getItem('user'))

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id = params['idAula'];
      this.idCurso = params['id'];
      console.log(this.idCurso)
      this.service.obter(this.id, this.idCurso).subscribe(retorno => {
        this.aula = retorno
        console.log(this.aula)
      })
    })
  }

  editarAula(){
    this.router.navigate([`/curso/${this.idCurso}/cadastro-aula/${this.id}`])
  }

  excluirAula(){
    this.service.excluir(this.id, this.idCurso).subscribe(retorno=>{
      this.toastr.success(retorno.mensagem)
      this.router.navigate([`/curso/${this.idCurso}`])
    })
  }

}
