import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Paciente } from 'src/app/interfaces/paciente';
import { PacienteService } from 'src/app/services/paciente.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {

  pacienteId!: string;
  pacienteSeleccionado!: Paciente;
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
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      foto: ''
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
    var paciente: Paciente = {
      nombre: this.user.value['nombre'],
      apellidos: this.user.value['apellidos'],
      correo: this.user.value['correo'],
      telefono: this.user.value['telefono'],
      foto: this.fotoSubida,
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
