import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { RegistrarPacienteComponent } from './pacientes/registrar-paciente/registrar-paciente.component';
import { ConsultaPacienteComponent } from './pacientes/consulta-paciente/consulta-paciente.component';
import { EditarPacienteComponent } from './pacientes/editar-paciente/editar-paciente.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTreeModule} from '@angular/material/tree';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    RegistrarPacienteComponent,
    ConsultaPacienteComponent,
    EditarPacienteComponent
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
    MatTabsModule,
    MatTreeModule,
    MatChipsModule,
    MatRadioModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class PagesModule { }
