import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Medico } from '../../interfaces/medico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacion-medico',
  templateUrl: './informacion-medico.component.html',
  styleUrls: ['./informacion-medico.component.css']
})
export class InformacionMedicoComponent implements OnInit {

  idMedico!: string;
  datosMedico!: Medico;
  public medico!: FormGroup;

  private buildForm() {
    this.medico = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: '',
      edad: ['', Validators.required],
      titulo: ['', [Validators.required]],
    });
  }

  enviar(){
    var medico: Medico = {
      nombre: this.medico.value['nombre'],
      apellidos: this.medico.value['apellidos'],
      correo: '',
      edad: this.medico.value['edad'],
      titulo: this.medico.value['titulo'],
      contrasena: '',
    };    
    this.authMedico.editarMedico(medico, this.idMedico);  
  }

  constructor(private authMedico: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.idMedico = window.localStorage.getItem('usuarioActual')!;
    this.authMedico.obtenerMedicoActivo(this.idMedico)
      .then((medico) => {
        this.datosMedico = medico!;
    });
    this.buildForm();
  }

}
