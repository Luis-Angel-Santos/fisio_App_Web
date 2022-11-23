import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import Swal from 'sweetalert2';
import { ExpedienteMedico, Paciente } from '../../../interfaces/paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-paciente',
  templateUrl: './consulta-paciente.component.html',
  styleUrls: ['./consulta-paciente.component.css']
})
export class ConsultaPacienteComponent implements OnInit {

  pacienteId!: string;
  pacienteSeleccionado!: Paciente;
  public expedienteMedico!: FormGroup;

  private buildForm() {
    this.expedienteMedico = this.formBuilder.group({
      alimentacion: ['', [Validators.required]],
      pasatiempos:  ['', [Validators.required]],
      religion:     ['', [Validators.required]],
      ejercicio:    ['', [Validators.required]],
      alcohol:      ['', [Validators.required]],
      drogas:       ['', [Validators.required]],
      fuma:         ['', [Validators.required]],
      sarampion:    ['', [Validators.required]],
      rubeola:      ['', [Validators.required]],
      varicela:     ['', [Validators.required]],
      escarlatina:  ['', [Validators.required]],
      polomelitis:  ['', [Validators.required]],
      hepatitis:    ['', [Validators.required]],
      transfuciones: ['', [Validators.required]],
      cancer:       ['', [Validators.required]],
      asma:         ['', [Validators.required]],
      diabetes:     ['', [Validators.required]],
      hipertension: ['', [Validators.required]],
      obesidad:     ['', [Validators.required]],
      alergias:     ['', [Validators.required]],
      cirugias:     ['', [Validators.required]],
      peso:         ['', [Validators.required]],
      talla:        ['', [Validators.required]],
      ta:           ['', [Validators.required]],
      fc:           ['', [Validators.required]],
      fr:           ['', [Validators.required]],
      datosSubjetivos: ['', [Validators.required]],
      datosObjetivos:  ['', [Validators.required]],
      estudiosDiagnosticos:  ['', [Validators.required]],
      impresionDiagnosticos: ['', [Validators.required]],
      diagnostico: ['', [Validators.required]],
      pronostico:  ['', [Validators.required]],
      tratamiento: ['', [Validators.required]],
      evolucion:   ['', [Validators.required]],
    });
  }

  enviarDatos(){
    var expediente: ExpedienteMedico = {
      alimentacion: this.expedienteMedico.value['alimentacion'],
      pasatiempos: this.expedienteMedico.value['pasatiempos'],
      religion: this.expedienteMedico.value['religion'],
      ejercicio: this.expedienteMedico.value['ejercicio'],
      alcohol: this.expedienteMedico.value['alcohol'],
      drogas: this.expedienteMedico.value['drogas'],
      fuma: this.expedienteMedico.value['fuma'],
      sarampion: this.expedienteMedico.value['sarampion'],
      rubeola: this.expedienteMedico.value['rubeola'],
      varicela: this.expedienteMedico.value['varicela'],
      escarlatina: this.expedienteMedico.value['escarlatina'],
      polomelitis: this.expedienteMedico.value['polomelitis'],
      hepatitis: this.expedienteMedico.value['hepatitis'],
      transfuciones: this.expedienteMedico.value['transfuciones'],
      cancer: this.expedienteMedico.value['cancer'],
      asma: this.expedienteMedico.value['asma'],
      diabetes: this.expedienteMedico.value['diabetes'],
      hipertension: this.expedienteMedico.value['hipertension'],
      obesidad: this.expedienteMedico.value['obesidad'],
      alergias: this.expedienteMedico.value['alergias'],
      cirugias: this.expedienteMedico.value['cirugias'],
      peso: this.expedienteMedico.value['peso'],
      talla: this.expedienteMedico.value['talla'],
      ta: this.expedienteMedico.value['ta'],
      fc: this.expedienteMedico.value['fc'],
      fr: this.expedienteMedico.value['fr'],
      datosSubjetivos: this.expedienteMedico.value['datosSubjetivos'],
      datosObjetivos: this.expedienteMedico.value['datosObjetivos'],
      estudiosDiagnosticos: this.expedienteMedico.value['estudiosDiagnosticos'],
      impresionDiagnosticos: this.expedienteMedico.value['impresionDiagnosticos'],
      diagnostico: this.expedienteMedico.value['diagnostico'],
      pronostico: this.expedienteMedico.value['pronostico'],
      tratamiento: this.expedienteMedico.value['tratamiento'],
      evolucion:this.expedienteMedico.value['evolucion'],
    };
    console.log(expediente);
    
  }

  constructor(private rutaActiva: ActivatedRoute,
              private pacienteService: PacienteService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.pacienteId = this.rutaActiva.snapshot.paramMap.get('id')!;
    this.pacienteService.mostrarUnPaciente(this.pacienteId)
      .then((paciente) => {
        this.pacienteSeleccionado = paciente!;
      });

  }

}
