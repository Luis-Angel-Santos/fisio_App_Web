import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/medico';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  firestore = getFirestore(this.app);
  email: string = '';
  password: string = '';
  sesionActiva!: any;

  crearMedico(medico: Medico){
    this.email = medico.correo;
    this.password = medico.contrasena;
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        
        this.crearDatosMedico(userCredential, medico);

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
        this.sesionActiva = userCredential.user.email;
        window.localStorage.setItem('usuarioActual', userCredential.user.uid)
        Swal.fire({
          icon: 'success',
          title: 'Entrando...',
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          this.router.navigateByUrl('home');
        })
      })
      .catch((error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Opps, hubo un problema',
          text: error.message,
          showConfirmButton: true,
          confirmButtonText: 'Reintentar'
        })
      })
  }

  async crearDatosMedico(user: UserCredential, datosMedico: Medico){
    await setDoc(doc(this.firestore, "medicos", user.user.uid), {
      id: user.user.uid,
      nombre: datosMedico.nombre,
      apellidos: datosMedico.apellidos,
      correo: user.user.email,
      edad: 0,
      titulo: '',
    });
  }

  
    

  constructor(private router: Router) { }
}
