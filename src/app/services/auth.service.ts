import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/medico';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError, initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  email: string = '';
  password: string = '';

  crearMedico(medico: Medico){
    this.email = medico.correo;
    this.password = medico.contrasena;
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        Swal.fire({
          icon: 'success',
          title: 'Cuenta Creada',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this.router.navigateByUrl('login');
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Opps, hubo un problema',
          text: error.message,
          showConfirmButton: true,
          confirmButtonText: 'Reintentar'
        })
    });
  }

  iniciarSesion(medico: Medico){
    this.email = medico.correo;
    this.password = medico.contrasena;
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        Swal.fire({
          icon: 'success',
          title: 'Entrando...',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          this.router.navigateByUrl('prueba');
        })
      })
      .catch((error) =>{
        //console.log(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Opps, hubo un problema',
          text: error.message,
          showConfirmButton: true,
          confirmButtonText: 'Reintentar'
        })
      })
  }
    

  constructor(private router: Router) { }
}
