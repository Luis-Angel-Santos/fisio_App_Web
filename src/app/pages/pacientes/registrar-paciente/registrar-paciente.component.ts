import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { PacienteService } from 'src/app/services/paciente.service';
import { environment } from 'src/environments/environment';
import { Paciente } from '../../../interfaces/paciente';

@Component({
  selector: 'app-registrar-paciente',
  templateUrl: './registrar-paciente.component.html',
  styleUrls: ['./registrar-paciente.component.css']
})
export class RegistrarPacienteComponent implements OnInit {

  hide = true;
  public user!: FormGroup;
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  storage = getStorage(this.app);
  file!: File;

  private buildForm() {
    this.user = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      expedienteMedico: ['', [Validators.required]],
      foto: '',
      //recetasAsignadas: ['', [Validators.required]]
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    var storageRef = ref(this.storage, this.file.name);
    uploadBytes(storageRef, this.file)
        .then((result) => {
          getDownloadURL(ref(this.storage, this.file.name))
            .then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              xhr.onload = (event) => {
                const blob = xhr.response;
              };
              xhr.open('GET', url);
              xhr.send();
              this.user.value['foto'] = url;
              
            })
            .catch((error) => {
              // Handle any errors
            });
    });
  }


  enviar(){    
    try {
      var paciente: Paciente = {
        nombre: this.user.value['nombre'],
        apellidos: this.user.value['apellidos'],
        correo: this.user.value['correo'],
        telefono: this.user.value['telefono'],
        foto: this.user.value['foto'],
      };    
      this.authPaciente.crearPaciente(paciente);
      
    } catch (error) { }
  }
  
  constructor(private formBuilder: FormBuilder,
              private authPaciente: PacienteService,) { }

  ngOnInit(): void {
    this.buildForm();
  }

}
