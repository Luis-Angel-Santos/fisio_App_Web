import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Paciente } from '../interfaces/paciente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  app = initializeApp(environment.firebase);
  auth = getAuth(this.app);
  firestore = getFirestore(this.app);
  email: string = '';
  password: string = '';
  pacientes: Paciente[] = [];

  crearPaciente(paciente: Paciente){
    this.email = paciente.correo;
    this.password = paciente.telefono.toString();
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        this.crearDatosPaciente(userCredential, paciente);
        Swal.fire({
          icon: 'success',
          title: 'Paciente Registrado',
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          this.router.navigateByUrl('home');
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

  async crearDatosPaciente(user: UserCredential, datosPaciente: Paciente){
    await setDoc(doc(this.firestore, "pacientes", user.user.uid), {
      id: user.user.uid,
      nombre: datosPaciente.nombre,
      apellidos: datosPaciente.apellidos,
      correo: user.user.email,
      telefono: datosPaciente.telefono,
      foto: datosPaciente.foto
    });
  }

  async mostrarPacientes(){
    const querySnapshot = await getDocs(collection(this.firestore, "pacientes"));
    querySnapshot.forEach((doc) => {
        if(doc.exists()){
          const datosPaciente: Paciente = {
            nombre: doc.data()['nombre'],
            apellidos: doc.data()['apellidos'],
            correo:doc.data()['correo'],
            telefono: doc.data()['telefono'],
            foto: doc.data()['foto'],
            id: doc.data()['id']
          }
          this.pacientes.push(datosPaciente);
        }else{
           console.log('no');
        }
    });
    return this.pacientes;
  }

  async mostrarUnPaciente(id: string){
    var paciente = await getDoc(doc(this.firestore, 'pacientes', id))
      .then((doc) => {
        if(doc.exists()){
          const datosPaciente: Paciente = {
            nombre: doc.data()['nombre'],
            apellidos: doc.data()['apellidos'],
            correo:doc.data()['correo'],
            telefono: doc.data()['telefono'],
            foto: doc.data()['foto'],
            id: doc.data()['id']
          }
          return datosPaciente;
        }else{
          console.log("No such document!");
          return;
        }
    });
    return paciente;
  }
 



  constructor(private router: Router) { }
}