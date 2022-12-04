import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarPacienteComponent } from './pages/pacientes/registrar-paciente/registrar-paciente.component';
import { RegisterComponent } from './pages/register/register.component';
import { ConsultaPacienteComponent } from './pages/pacientes/consulta-paciente/consulta-paciente.component';
import { EditarPacienteComponent } from './pages/pacientes/editar-paciente/editar-paciente.component';
import { HistorialClinicoComponent } from './pages/pacientes/historial-clinico/historial-clinico.component';
import { InformacionMedicoComponent } from './pages/informacion-medico/informacion-medico.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
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
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrarPaciente',
    component: RegistrarPacienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'consultarPaciente/:id',
    component: ConsultaPacienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editarPaciente/:id',
    component: EditarPacienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'verHistorial/:id',
    component: HistorialClinicoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modificarMiInformacion',
    component: InformacionMedicoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
