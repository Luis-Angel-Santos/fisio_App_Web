import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarPacienteComponent } from './pages/pacientes/registrar-paciente/registrar-paciente.component';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ConsultaPacienteComponent } from './pages/pacientes/consulta-paciente/consulta-paciente.component';
import { EditarPacienteComponent } from './pages/pacientes/editar-paciente/editar-paciente.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crearCuenta',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registrarPaciente',
    component: RegistrarPacienteComponent
  },
  {
    path: 'consultarPaciente/:id',
    component: ConsultaPacienteComponent
  },
  {
    path: 'editarPaciente/:id',
    component: EditarPacienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
