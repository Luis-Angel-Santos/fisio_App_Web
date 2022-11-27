import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, deleteDoc, doc, getDoc, setDoc, updateDoc, query, onSnapshot } from "firebase/firestore";
import { Paciente, ExpedienteMedico, Receta } from '../interfaces/paciente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';

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
      expedienteMedico: datosPaciente.idExpedienteMedico,
      foto: datosPaciente.foto
    });
  }

  mostrarPacientes(): Observable<Paciente[]>{
    const placeRef = collection(this.firestore, 'pacientes'); 
    return collectionData(placeRef, {idField: 'id'}) as Observable<Paciente[]>
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
            idExpedienteMedico: doc.data()['expedienteMedico'],
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
 
  async eliminarPaciente(id: string){
    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Paciente',
      text: '¿Esta seguro? Esta Acción no se puede revertir',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'red',
      cancelButtonColor: 'yellow'
    }).then(async (resp) => {
      if(resp.isConfirmed){
        await deleteDoc(doc(this.firestore, "pacientes", id))
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Paciente eliminado',
              text: 'Paciente eliminado de forma correcta',
              showConfirmButton: true,
              confirmButtonText: 'Ok'
            })
          });
      }
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Opps, hubo un problema',
        text: error.message,
        showConfirmButton: true,
        confirmButtonText: 'Reintentar'
      })
    }) 
  }

  async editarPaciente(paciente: Paciente, idPaciente: string){
    await updateDoc(doc(this.firestore, "pacientes", idPaciente), {
      id: idPaciente,
      nombre: paciente.nombre,
      apellidos: paciente.apellidos,
      correo: paciente.correo,
      telefono: paciente.telefono,
      foto: ''
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

  async crearHistoriaClinica(expedienteMedico: ExpedienteMedico, idExpediente: string){
    var tiempoHoy = Date.now();
    var fechaSinFormato = new Date(tiempoHoy);
    var fecha = fechaSinFormato.toDateString();
    await setDoc(doc(this.firestore, `expedientesMedicos/${idExpediente}/historiasClinicas/${fecha}`), {
        alimentacion: expedienteMedico.alimentacion,
        pasatiempos: expedienteMedico.pasatiempos,
        religion: expedienteMedico.religion,
        ejercicio: expedienteMedico.ejercicio,
        alcohol: expedienteMedico.alcohol,
        drogas: expedienteMedico.drogas,
        fuma: expedienteMedico.fuma,
        sarampion: expedienteMedico.sarampion,
        rubeola: expedienteMedico.rubeola,
        varicela: expedienteMedico.varicela,
        escarlatina: expedienteMedico.escarlatina,
        polomelitis: expedienteMedico.polomelitis,
        hepatitis: expedienteMedico.hepatitis,
        transfuciones: expedienteMedico.transfuciones,
        cancer: expedienteMedico.cancer,
        asma: expedienteMedico.asma,
        diabetes: expedienteMedico.diabetes,
        hipertension: expedienteMedico.hipertension,
        obesidad: expedienteMedico.obesidad,
        alergias: expedienteMedico.alergias,
        cirugias: expedienteMedico.cirugias,
        peso: expedienteMedico.peso,
        talla: expedienteMedico.talla,
        ta: expedienteMedico.ta,
        fc: expedienteMedico.fc,
        fr: expedienteMedico.fr,
        datosSubjetivos: expedienteMedico.datosSubjetivos,
        datosObjetivos: expedienteMedico.datosObjetivos,
        estudiosDiagnosticos: expedienteMedico.estudiosDiagnosticos,
        impresionDiagnosticos: expedienteMedico.impresionDiagnosticos,
        diagnostico: expedienteMedico.diagnostico,
        pronostico: expedienteMedico.pronostico,
        tratamiento: expedienteMedico.tratamiento,
        evolucion: expedienteMedico.evolucion,
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Expediente Guardado Correctamente',
        text: 'Información actualizada',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false
      }).then(() => this.router.navigateByUrl('home'))
    })
  }

  async asignarNuevaReceta(receta: Receta, idExpediente: string){
    await setDoc(doc(this.firestore, `expedientesMedicos/${idExpediente}/recetasAsginadas/${receta.fecha}`), {
      fecha: receta.fecha,
      descripcion: receta.descripcion,
      tratamiento: receta.tratamiento,
      nombreMedico: receta.nombreMedico,
      nombrePaciente: receta.nombrePaciente 
    })
  }

  constructor(private router: Router, private db: Firestore) { }
}
