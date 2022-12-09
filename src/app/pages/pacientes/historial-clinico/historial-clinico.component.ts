import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { ExpedienteMedico, Receta, Paciente } from '../../../interfaces/paciente';
import { jsPDF } from "jspdf";
import { Medico } from 'src/app/interfaces/medico';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-historial-clinico',
  templateUrl: './historial-clinico.component.html',
  styleUrls: ['./historial-clinico.component.css']
})
export class HistorialClinicoComponent implements OnInit {
  
  pacienteId!: string;
  recetas!: Receta[];
  historiasClinicas!: ExpedienteMedico[];
  paciente!: Paciente;
  
  generarPdf(fecha: string, descripcion: string, tratamiento: string){
    var foto;
    if(this.paciente.foto == ''){
      foto = this.paciente.foto;
    }else{
      foto = '../../../../assets/user.png';
    }
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
    });
    doc.addImage('../../../../assets/logo.png', 'png', 20, 20, 50,50);
    doc.text('FISIO', 30, 80);
    doc.text(`Historia Clinica de ${this.paciente.nombre}`, 125, 80)
    doc.text(`Fecha: ${fecha}`, 280, 40);
    doc.text('El presente documento contiene la historia clinica del paciente', 30, 120)
    doc.text(`-- Descripción: ${descripcion}`, 30, 150);
    doc.text(`-- Tratamiento: ${tratamiento}`, 30, 165);
    doc.text('Datos Generales del Paciente', 125, 200);
    doc.text(`-Nombre Completo: ${this.paciente.nombre} ${this.paciente.apellidos}`, 30, 230);
    doc.text(`-Número Telefonico: ${this.paciente.telefono}`, 30, 245);
    doc.text(`-Expediente Medico: ${this.paciente.idExpedienteMedico}`, 30, 260);
    doc.addImage('../../../../assets/user.png', 'png', 285, 225, 80,80)

    doc.save(`HistoriaClinica_${this.paciente.nombre}_${fecha}`);
  }

  generarPdfReceta(fecha: string, descripcion: string, medico:string, tratamiento: string){
    var foto;
    if(this.paciente.foto == ''){
      foto = this.paciente.foto;
    }else{
      foto = '../../../../assets/user.png';
    }
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'letter',
      
    });
    doc.addImage('../../../../assets/logo.png', 'png', 20, 20, 50,50);
    doc.text('FISIO', 30, 80);
    doc.text(`Receta Medica de ${this.paciente.nombre} ${this.paciente.apellidos}`, 125, 80)
    doc.text(`Fecha: ${fecha}`, 280, 40);
    doc.text(`Receta asignada por ${medico}`, 30, 120)
    doc.text(`El fisioterapeuta ${medico} en base a la consulta realizada`, 30, 150);
    doc.text(`el dia ${fecha} con el paciente ${this.paciente.nombre} ${this.paciente.apellidos}`, 30, 165);
    doc.text('receta lo siguiente a dicho paciente.', 30, 180);
    doc.text(`--Descripción: ${descripcion}`, 30, 210);
    doc.text(`--Tratamiento: ${tratamiento}`, 30, 225);
    doc.text(`Información general del paciente`, 125, 255);
    doc.text(`-Nombre Completo: ${this.paciente.nombre} ${this.paciente.apellidos}`, 30, 285);
    doc.text(`-Número Telefonico: ${this.paciente.telefono}`, 30, 300);
    doc.text(`-Expediente Medico: ${this.paciente.idExpedienteMedico}`, 30, 315);
    doc.addImage('../../../../assets/user.png', 'png', 285, 285, 80,80)

    doc.save(`RecetaMedica_${this.paciente.nombre}_${fecha}`);
  }

  constructor(private rutaActiva: ActivatedRoute,
              private pacienteService: PacienteService,
              private authMedico: AuthService) { }

  ngOnInit(): void {
    this.pacienteId = this.rutaActiva.snapshot.paramMap.get('id')!;
    this.pacienteService.mostrarUnPaciente(this.pacienteId)
      .then((paciente) => {
        this.paciente = paciente!;
        this.pacienteService.mostrarRecetasAsignadas(paciente?.idExpedienteMedico!)
        .subscribe(recetas => {
          this.recetas = recetas; 
      });
      this.pacienteService.mostrarHistorialClinico(paciente?.idExpedienteMedico!)
        .subscribe(historiasClin => {
          this.historiasClinicas = historiasClin;
      });
      });
    }

}
