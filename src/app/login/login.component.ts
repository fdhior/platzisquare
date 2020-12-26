import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  doLogin: any = {};

  constructor(
    private autorizacionService: AutorizacionService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.autorizacionService.login(this.doLogin.email, this.doLogin.password);
  }

  facebookLogin() {
    this.autorizacionService.facebookLogin();
  }

}
