import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pacientes!: any;

  eliminarPaciente(idPaciente: string){
    this.pacientesService.eliminarPaciente(idPaciente) 
      .then(() => this.mostrarPacientes());
  }

  mostrarPacientes(){
    this.pacientesService.mostrarPacientes()
      .then((res) => this.pacientes = res );
  }

  constructor(private pacientesService: PacienteService) { }

  ngOnInit(): void { 
    this.mostrarPacientes();
  } 

}
