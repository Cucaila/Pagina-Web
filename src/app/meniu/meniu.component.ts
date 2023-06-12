import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Firestore, collection, collectionData, doc } from '@angular/fire/firestore';

import { Observable } from 'rxjs/internal/Observable';
import { deleteDoc } from 'firebase/firestore';

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

  username: string='';
  password: string='';

  // contactForm!: FormGroup;
  isSubmit = true;
  submitMessage='';

  // private myform!: CollectionReference<any>;
  userData!: Observable<any[]>;

  // private myformPacienti!: CollectionReference<any>;
  // pacienti!: Observable<any[]>;
  usrData!: Observable<any[]>
  // contactformPacienti!: FormGroup;

  // private myformTratament!: CollectionReference<any>;
  // tratamente!: Observable<any[]>;
  // usData!: Observable<any[]>
  // contactformTratament!: FormGroup;

  constructor(private auth: AuthService, private firestore: Firestore){
    this.getDocument();
    this.getPacientDocument();
    // this.getTratmentDocument();
  }
  

  showForm(formName: string) {
    this.showForm1 = formName === 'form1';
    this.showForm2 = formName === 'form2';
    this.showForm3 = formName === 'form3';
  }

  ngOnInit(): void {

    // this.myform = collection(this.firestore, 'medici');

    // this.contactForm = this.formBuilder.group({
    //   nume:[null,Validators.required],
    //   prenume:[null,Validators.required],
    //   departament:[null,Validators.required],
    //   varsta:[null,[Validators.required]]
    // });

    // this.myformPacienti = collection(this.firestore, 'pacienti');

    // this.contactformPacienti = this.formBuilder.group({
    //   nume: [null, Validators.required],
    //   prenume : [null, Validators.required],
    //   medic : [null, Validators.required],
    //   varsta : [null, Validators.required],
    //   cnp : [null, Validators.required],
    //   adresa : [null, Validators.required],
    //   profesie : [null, Validators.required],
    //   locDeMunca : [null, Validators.required],
    //   numarDeTelefon : [null, Validators.required]
    // });

    // this.myformTratament = collection(this.firestore, 'tratamente');

    // this.contactformTratament = this.formBuilder.group({
    //   nume: [null, Validators.required],
    //   prenume : [null, Validators.required],
    //   numeMedicament : [null, Validators.required],
    //   administrare : [null, Validators.required],
    //   durataTratament : [null, Validators.required],
    //   codPat : [null, Validators.required],
    //   // comanda : [null, Validators.required],
    // });
   

  //   this.medici = this.myform.snapshotChanges().pipe(
  //     map((actions) => {
  //       return actions.map((a) => {
  //         const data = a.payload.doc.data() as Medic;
  //         const id = a.payload.doc.id;
  //         return { id, ...data };
  //       });
  //     })
  //   );
  // }
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
    this.submitMessage = 'Submitted Successfully!';
           this.isSubmit = true;
           setTimeout(() => {
             this.isSubmit = false;
           }, 8000);
  }

  // submitAddMedic(value: any){
  // addDoc(this.myform, value)
  //     .then(() => {
  //       this.submitMessage = 'Submitted Successfully!';
  //       this.isSubmit = true;
  //       setTimeout(() => {
  //         this.isSubmit = false;
  //       }, 8000);
  //     })
  //     .catch((err: any) => {
  //       console.log(err);
  //     });
  // }

  getDocument(): void {
    const CollectionInstance = collection(this.firestore, 'medici');
    collectionData(CollectionInstance, {idField: 'id' })
    .subscribe(value => {
      console.log(value)
    });

    this.userData = collectionData(CollectionInstance, {idField: 'id' });
  }

//   submitAddPacient(value: any){
//     console.log(value);
 
//     addDoc(this.myformPacienti, value)
//     .then(() => {
//       this.submitMessage = 'Submitted Successfully!';
//       this.isSubmit = true;
//       setTimeout(() => {
//         this.isSubmit = false;
//       }, 8000);
//     })
//     .catch((err: any) => {
//       console.log(err);
//     });
// }

getPacientDocument(): void {
  const CollectionInstance = collection(this.firestore, 'pacienti');
  collectionData(CollectionInstance, {idField: 'id' })
  .subscribe(value => {
    console.log(value)
  });

  this.usrData = collectionData(CollectionInstance, {idField: 'id' });
}

// submitAddTratament(value: any) {
//   console.log(value);
//   addDoc(this.myformTratament, value)
//     .then(() => {
//       this.submitMessage = 'Submitted Successfully!';
//       this.isSubmit = true;
//       setTimeout(() => {
//         this.isSubmit = false;
//       }, 8000);
//     })
//     .catch((err: any) => {
//       console.log(err);
//     });
// }

// getTratmentDocument(): void {
//   const CollectionInstance = collection(this.firestore, 'tratamente');
//   collectionData(CollectionInstance)
//   .subscribe(value => {
//     console.log(value)
//   });

//   this.userData = collectionData(CollectionInstance);
// }
  

  // getMedici(): Observable<any[]> {
  //   return this.myform.get().pipe(
  //     map((querySnapshot: QuerySnapshot<Medic>) => {
  //       const medici: Medic[] = [];
  //       querySnapshot.forEach((doc) => {
  //         medici.push(doc.data());
  //       });
  //       return medici;
  //     })
  //   );
  // }

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

}

