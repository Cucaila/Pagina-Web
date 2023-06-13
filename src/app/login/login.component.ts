import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: string='';
password: string='';


ngOnInit(): void{}

constructor(private auth: AuthService){}

login(){
  if(this.username=='' && this.password==''){
    alert('Introduceti datele!');
    return;
  }
  
  if(this.username==''){
    alert('Introduceti numele de utilizator!');
    return;
  }
  if(this.password==''){
    alert('Introduceti parola!');
    return;
  }
  this.auth.login(this.username, this.password);
  this.username='';
  this.password='';
}


register(){
  if(this.username=='' && this.password==''){
    alert('Introduceti datele!');
    return;
  }
  
  if(this.username==''){
    alert('Introduceti numele de utilizator!');
    return;
  }
  if(this.password==''){
    alert('Introduceti parola!');
    return;
  }

  this.auth.register(this.username, this.password);
  this.username='';
  this.password='';
}

}
