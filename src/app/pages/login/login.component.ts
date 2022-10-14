import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medico } from 'src/app/interfaces/medico';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  public user!: FormGroup;

  private buildForm() {
    this.user = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
  }

  enviar(){    
    try {
      //console.log(this.user.value);
      var medico: Medico = {
        correo: this.user.value['correo'],
        contrasena: this.user.value['contrasena'],
      };    
      this.auth.iniciarSesion(medico);    
    } catch (error) { }
  }

  constructor(private formBuilder: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.buildForm();
  }

}
