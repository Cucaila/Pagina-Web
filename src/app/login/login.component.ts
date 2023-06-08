import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';

@Component({
  selector: 'app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: string='';
password: string='';


ngOnInit(): void{}

constructor(private auth: AuthService, private router: Router, private dialog: DialogOverviewComponent){}

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

openDialog(){
   this.dialog.openDialog();
}

// register(){
//   if(this.username=='' && this.password==''){
//     alert('Introduceti datele!');
//     return;
//   }
  
//   if(this.username==''){
//     alert('Introduceti numele de utilizator!');
//     return;
//   }
//   if(this.password==''){
//     alert('Introduceti parola!');
//     return;
//   }

//   this.auth.register(this.username, this.password);
//   this.username='';
//   this.password='';
// }

}
