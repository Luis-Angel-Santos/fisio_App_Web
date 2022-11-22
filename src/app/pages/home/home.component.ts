import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../interfaces/paciente';
import { Firestore } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pacientes!: Paciente[];

  eliminarPaciente(idPaciente: any){
    this.pacientesService.eliminarPaciente(idPaciente);
  }

  constructor(private pacientesService: PacienteService) { }

  ngOnInit(): void { 
    this.pacientesService.mostrarPacientes()
      .subscribe(pacientes => {
        this.pacientes = pacientes;
      })
     
  } 

}
