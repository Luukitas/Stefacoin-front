import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../../public/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  usuario = JSON.parse(localStorage.getItem('user'))
  
  ngOnInit(): void {}

  navegar(rota: string): void {
    console.log(rota)
    this.route.navigate([`/${rota}`])
  }

}
