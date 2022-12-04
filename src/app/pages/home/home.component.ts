import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interfaces/paciente';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pacientes!: Paciente[];
  p: number = 1;

  eliminarPaciente(idPaciente: any){
    this.pacientesService.eliminarPaciente(idPaciente);
  }

  pageChangeEvent(event: number){
    this.p = event;
  }

  constructor(private pacientesService: PacienteService,
              private authService: AuthService) { }

  ngOnInit(): void { 
    this.pacientesService.mostrarPacientes()
      .subscribe(pacientes => {
        this.pacientes = pacientes;
      })
  } 

}
