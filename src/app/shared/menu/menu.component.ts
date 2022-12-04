import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cerrarSesion(){
    this.authService.cerrarSesion();
  }

  constructor(public authService: AuthService) { }

  ngOnInit(): void {}

}
