import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router){}

  goToMenu(){
    this.router.navigate(['login/meniu']);
  }
}
