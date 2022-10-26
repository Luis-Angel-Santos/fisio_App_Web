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

  constructor(private pacientesService: PacienteService) { }

  ngOnInit(): void {   
    this.pacientesService.mostrarPacientes().then((res) => { this.pacientes = res })
    
  } 

}
