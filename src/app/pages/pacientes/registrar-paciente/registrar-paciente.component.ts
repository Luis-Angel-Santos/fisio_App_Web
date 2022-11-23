import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
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
  subirFoto!: boolean;
  progreso: number = 0;
  fotoSubida: string = '';

  private buildForm() {
    this.user = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10),  Validators.pattern("^[0-9]*$")]],
      idExpedienteMedico: ['', [Validators.required]],
      foto: '',
      //recetasAsignadas: ['', [Validators.required]]
    });
  }

  onFileSelect(event: any) {
    this.subirFoto = true;
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
    var storageRef = ref(this.storage, this.file.name);
    var uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed', (snapshot) => {
      //Obteniedo progreso de subida
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.progreso = progress;
    },(error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    },() => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        this.fotoSubida = downloadURL;
      });
    })
  };


  enviar(){    
    try {
      var paciente: Paciente = {
        nombre: this.user.value['nombre'],
        apellidos: this.user.value['apellidos'],
        correo: this.user.value['correo'],
        telefono: this.user.value['telefono'],
        idExpedienteMedico: this.user.value['idExpedienteMedico'],
        foto: this.fotoSubida
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
