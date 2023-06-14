import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Firestore, addDoc, collection, collectionData, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { CollectionReference, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class MeniuComponent implements OnInit {
  showForm1 = false;
  showForm2 = false;
  showForm3 = false;
  showForm4 = false;

  isReadOnly: boolean=true;
  showButton = false;
  showButton2 = true;

  username: string='';
  password: string='';

  contactForm!: FormGroup;
  isSubmit = true;
  submitMessage='';

  private myform!: CollectionReference<any>;
  userData!: Observable<any[]>;
  usrData!: Observable<any[]>

  constructor(private auth: AuthService, private firestore: Firestore, private formBuilder: FormBuilder){
    this.getDocument();
    this.getPacientDocument();
  }
  

  showForm(formName: string) {
    this.showForm1 = formName === 'form1';
    this.showForm2 = formName === 'form2';
    this.showForm3 = formName === 'form3';
    this.showForm4 = formName ==='form4'
  }

  ngOnInit(): void {

    this.myform = collection(this.firestore, 'medici');

    this.contactForm = this.formBuilder.group({
      nume:[null,Validators.required],
      prenume:[null,Validators.required],
      departament:[null,Validators.required],
      varsta:[null,[Validators.required]]
    });
  }

  register(){
    if(this.username=='' && this.password==''){
      alert('Introduceti datele!');
      return;
    }
    
    else if(this.username==''){
      alert('Introduceti numele de utilizator!');
      return;
    }
    else if(this.password==''){
      alert('Introduceti parola!');
      return;
    } else{
    this.auth.register(this.username, this.password)
    this.username='';
    this.password='';
    this.submitMessage = 'Submitted Successfully!';
           this.isSubmit = true;
           setTimeout(() => {
             this.isSubmit = false;
           }, 8000);
          }
  }

  submitAddMedic(value: any){
  addDoc(this.myform, value)
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

  getDocument(): void {
    const CollectionInstance = collection(this.firestore, 'medici');
    collectionData(CollectionInstance, {idField: 'id' })
    .subscribe(value => {
      console.log(value)
    });

    this.userData = collectionData(CollectionInstance, {idField: 'id' });
  }

getPacientDocument(): void {
  const CollectionInstance = collection(this.firestore, 'pacienti');
  collectionData(CollectionInstance, {idField: 'id' })
  .subscribe(value => {
    console.log(value)
  });

  this.usrData = collectionData(CollectionInstance, {idField: 'id' });
}

  updateFirstStep(){
    this.isReadOnly = false;
    this.showButton = true;
    this.showButton2 = false;
  }

  deletePacienti(id1: string){
    const docInstance = doc(this.firestore, 'pacienti', id1);
    deleteDoc(docInstance)
    .then(()=> {
      console.log('Data deleted');
    })
  }

  deleteMedici(id2: string){
    const docInstance = doc(this.firestore, 'medici', id2);
    deleteDoc(docInstance)
    .then(()=> {
      console.log('Data deleted');
    })
  }

  updateMedici(id3: string, value: any){
    const docInstance = doc(this.firestore, 'medici', id3);
    const updateDataPac=
    {
      nume: value.nume,
      prenume : value.prenume,
      departament: value.departament,
      varsta : value.varsta
    }

    updateDoc(docInstance, updateDataPac)
    .then(()=> {
      console.log('data updated');
    })
    .catch((err)=>{
      console.log(err);
    });

    this.isReadOnly = true;
    this.showButton = false;
    this.showButton2 = true;
  }
 
  logout(){
    this.auth.logout();
  }
}

