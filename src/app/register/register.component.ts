import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collectionData, collection, CollectionReference, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class RegisterComponent implements OnInit{
  rol: string='';
  contactFormUser!: FormGroup;
  isSubmit = true;
  submitMessage='';

  private userPacientCollection!: CollectionReference<any>;
  private userMedicCollection!: CollectionReference<any>;
  userData!: Observable<any[]>;
  
  constructor(private formBuilder: FormBuilder, private firestore: Firestore, private router: Router){}
  
  ngOnInit(): void {
    this.userMedicCollection = collection(this.firestore, 'userMedici');

    this.contactFormUser = this.formBuilder.group({
      email:[null,Validators.required],
      parola:[null,Validators.required],
      rol:[null,Validators.required],
    });

    this.userPacientCollection = collection(this.firestore, 'userPacient');

    this.contactFormUser = this.formBuilder.group({
      email:[null,Validators.required],
      parola:[null,Validators.required],
      rol:[null,Validators.required],
    });


  }

  AddUser(){
    if(this.rol=="medic") {
      this.AddUsersMedici(this.contactFormUser.value);
      this.router.navigate(['login']);
    } else if(this.rol=="pacient") {
      this.AddUsersPacienti(this.contactFormUser.value);
      this.router.navigate(['login']);
    } else 
    alert("Rolul introdus nu se potriveste!");
  }

  AddUsersMedici(value: any){
    addDoc(this.userMedicCollection, value)
        .then(() => {
          this.submitMessage = 'Submitted Successfully!';
          this.isSubmit = true;
          setTimeout(() => {
            this.isSubmit = false;
          }, 8000);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }

    AddUsersPacienti(value: any){
      addDoc(this.userPacientCollection, value)
          .then(() => {
            this.submitMessage = 'Submitted Successfully!';
            this.isSubmit = true;
            setTimeout(() => {
              this.isSubmit = false;
            }, 8000);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }

}
