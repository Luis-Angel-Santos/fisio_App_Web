import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
import { Paciente } from '../../../interfaces/paciente';

@Component({
  selector: 'app-consulta-paciente',
  templateUrl: './consulta-paciente.component.html',
  styleUrls: ['./consulta-paciente.component.css']
})
export class ConsultaPacienteComponent implements OnInit {

  pacienteId!: string;
  pacienteSeleccionado!: Paciente;

  enviarDatos(){
    Swal.fire({
      icon: 'info',
      title: 'Estamos trabajando en ello :)',
      text: 'Calidad no cantidad',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  constructor(private rutaActiva: ActivatedRoute,
              private pacienteService: PacienteService) { }

  ngOnInit(): void {
    this.pacienteId = this.rutaActiva.snapshot.paramMap.get('id')!;
    this.pacienteService.mostrarUnPaciente(this.pacienteId)
      .then((paciente) => {
        this.pacienteSeleccionado = paciente!;
      })
  }

}
