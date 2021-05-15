import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { DetalhesAlunoComponent } from './pages/private/aluno/detalhes-aluno/detalhes-aluno.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { CadastroAulaComponent } from './pages/private/aula/cadastro-aula/cadastro-aula.component';
import { DetalheAulaComponent } from './pages/private/aula/detalhe-aula/detalhe-aula.component';
import { CadastroCursoComponent } from './pages/private/cursos/cadastro-curso/cadastro-curso.component';
import { DetalheCursoComponent } from './pages/private/cursos/detalhe-curso/detalhe-curso.component';
import { ListarCursoComponent } from './pages/private/cursos/listar-curso/listar-curso.component';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'professor',
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent,
  },
  {
    path: 'aluno',
    canActivate: [AuthGuardService],
    component: ListarAlunoComponent,
  },
  {
    path: 'lista-curso',
    canActivate: [AuthGuardService],
    component: ListarCursoComponent,
  },
  {
    path: 'curso',
    canActivate: [AuthGuardService],
    component: CadastroCursoComponent,
  },
  {
    path: 'curso/:id',
    canActivate: [AuthGuardService],
    component: DetalheCursoComponent,
  },
  {
    path: 'curso/:id/cadastro-aula',
    canActivate: [AuthGuardService],
    component: CadastroAulaComponent,
  },  
  {
    path: 'curso/:id/cadastro-aula/:idAula',
    canActivate: [AuthGuardService],
    component: CadastroAulaComponent,
  },  
  {
    path: 'curso/:id/detalhes-aula/:idAula',
    canActivate: [AuthGuardService],
    component: DetalheAulaComponent,
  },  
  {
    path: 'aluno/detalhes-aluno',
    canActivate: [AuthGuardService],
    component: DetalhesAlunoComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
