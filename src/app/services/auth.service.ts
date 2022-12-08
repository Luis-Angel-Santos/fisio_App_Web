import { Injectable } from '@angular/core';
import { Medico } from '../interfaces/medico';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  firestore = getFirestore(this.app);
  email: string = '';
  password: string = '';
  sesionActiva!: boolean;

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
        this.sesionActiva = true;
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
      contrasena: datosMedico.contrasena,
      edad: 0,
      titulo: '',
    });
  }

  async obtenerMedicoActivo(id: string){
    var paciente = await getDoc(doc(this.firestore, 'medicos', id))
      .then((doc) => {
        if(doc.exists()){
          const datosMedico: Medico = {
            nombre: doc.data()['nombre'],
            apellidos: doc.data()['apellidos'],
            correo: doc.data()['correo'],
            contrasena: doc.data()['contrasena'],
            edad: doc.data()['edad'],
            titulo: doc.data()['titulo'],
            foto: doc.data()['foto']
          }
          return datosMedico;
        }else{
          console.log("No such document!");
          return ;
        }
    });
    return paciente;
  }

  async editarMedico(medico: Medico, idMedico: string){
    if(medico.foto == ''){
      await updateDoc(doc(this.firestore, "medicos", idMedico), {
        nombre: medico.nombre,
        apellidos: medico.apellidos,
        edad: medico.edad,
        titulo: medico.titulo
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Modificados',
          text: 'Información actualizada',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => this.router.navigateByUrl('home'))
      })
    }else{
      await updateDoc(doc(this.firestore, "medicos", idMedico), {
        nombre: medico.nombre,
        apellidos: medico.apellidos,
        edad: medico.edad,
        titulo: medico.titulo,
        foto: medico.foto
      }).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos Modificados',
          text: 'Información actualizada',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false
        }).then(() => this.router.navigateByUrl('home'))
      })
    }
    
  }

  sesionActive():Observable<boolean>{
    if(localStorage.getItem('usuarioActual')){
      return observableOf(true);
    }else{
      return observableOf(false);
    }
  }

  cerrarSesion(){
    Swal.fire({
      icon: 'warning',
      title: '¿Cerrar Sesión?',
      text: '¿Esta seguro de esta acción?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red'
    }).then((resp) => {
      if(resp.isConfirmed){
        this.auth.signOut();
        localStorage.removeItem('usuarioActual');
        this.router.navigate(['login']);
      }
    });
  }
    

  constructor(private router: Router) {
  }
}
