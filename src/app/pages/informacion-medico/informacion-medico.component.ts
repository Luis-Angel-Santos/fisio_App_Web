import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Medico } from '../../interfaces/medico';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

@Component({
  selector: 'app-informacion-medico',
  templateUrl: './informacion-medico.component.html',
  styleUrls: ['./informacion-medico.component.css']
})
export class InformacionMedicoComponent implements OnInit {

  idMedico!: string;
  datosMedico!: Medico;
  public medico!: FormGroup;
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  storage = getStorage(this.app);
  file!: File;
  subirFoto!: boolean;
  progreso: number = 0;
  fotoSubida: string = '';

  private buildForm() {
    this.medico = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: '',
      edad: ['', Validators.required],
      titulo: ['', [Validators.required]],
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
    var medico: Medico = {
      nombre: this.medico.value['nombre'],
      apellidos: this.medico.value['apellidos'],
      correo: '',
      edad: this.medico.value['edad'],
      titulo: this.medico.value['titulo'],
      contrasena: '',
      foto: this.fotoSubida
    };    
    this.authMedico.editarMedico(medico, this.idMedico);  
  }

  constructor(private authMedico: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.idMedico = localStorage.getItem('usuarioActual')!;
    this.authMedico.obtenerMedicoActivo(this.idMedico)
      .then((medico) => {
        this.datosMedico = medico!;
    });
    this.buildForm();
  }

}
