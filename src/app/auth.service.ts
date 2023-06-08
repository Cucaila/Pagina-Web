import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }
  
  //login method
  login(username: string, password: string){
    this.fireauth.signInWithEmailAndPassword(username, password).then(()=>{
        localStorage.setItem('token', 'true');
        this.router.navigate(['/login/meniu']);
    }, err=>{
        alert('Esti prost');
        this.router.navigate(['/login']);
    })
  }

  //register method
  // register(username: string, password: string){
  //   this.fireauth.createUserWithEmailAndPassword(username, password).then(()=>{
  //       this.router.navigate(['/login/meniu']);
  //   }, err=>{
  //       alert('Esti prost');
  //       this.router.navigate(['/login']);
  //   })
  // }

  //sign out
  logout(){
    this.fireauth.signOut().then(()=> {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err=>{
      alert('Esti prost');
    })
  }
}
