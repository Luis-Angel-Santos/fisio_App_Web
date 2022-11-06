import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  pacienteId!: string;
  pacienteSeleccionado!: Paciente;
  public user!: FormGroup;

  private buildForm() {
    this.user = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }

  enviar(){ 
    var paciente: Paciente = {
      nombre: this.user.value['nombre'],
      apellidos: this.user.value['apellidos'],
      correo: this.user.value['correo'],
      telefono: this.user.value['telefono'],
      foto: this.user.value['foto'],
    };    
    this.pacienteService.editarPaciente(paciente, this.pacienteId);
  }

  constructor(private rutaActiva: ActivatedRoute,
              private pacienteService: PacienteService,
              private formBuilder: FormBuilder,
              private authPaciente: PacienteService,) { }

  ngOnInit(): void {
    this.buildForm();
    this.pacienteId = this.rutaActiva.snapshot.paramMap.get('id')!;
    this.pacienteService.mostrarUnPaciente(this.pacienteId)
      .then((paciente) => {
        this.pacienteSeleccionado = paciente!;
      })
  }

}
