import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Params, ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { RegistrarPacienteComponent } from './pacientes/registrar-paciente/registrar-paciente.component';
import { ConsultaPacienteComponent } from './pacientes/consulta-paciente/consulta-paciente.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegistrarPacienteComponent,
    ConsultaPacienteComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
