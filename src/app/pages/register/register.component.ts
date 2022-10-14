import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Medico } from 'src/app/interfaces/medico';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  public user!: FormGroup;

  private buildForm() {
    this.user = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      recontrasena: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  enviar(){    
    try {
      //console.log(this.user.value);
      var medico: Medico = {
        nombre: this.user.value['nombre'],
        apellidos: this.user.value['apellidos'],
        correo: this.user.value['correo'],
        contrasena: this.user.value['contrasena'],
      };    
      this.auth.crearMedico(medico);
      
    } catch (error) { }
  }

  constructor(private formBuilder: FormBuilder, 
              private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

}
