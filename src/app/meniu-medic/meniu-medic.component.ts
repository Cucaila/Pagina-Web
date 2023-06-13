import { Component, OnInit } from '@angular/core';
import { CollectionReference, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Pacient } from '../pacient.model';


@Component({
  selector: 'app',
  templateUrl: './meniu-medic.component.html',
  styleUrls: ['./meniu-medic.component.css']
})
export class MeniuMedicComponent implements OnInit{

  showForm2 = false;
  showForm3 = false;
  showForm4 = false;
  showForm5 = false;
  showButton = false;
  showButton2 = true;


  ordersId : number = 0;
  isReadOnly: boolean=true;

  myDocOrders! : DocumentReference<any>;

  myFormOrders! : CollectionReference<any>;
  contactFormOrders!: FormGroup;
  ordersData!: Observable<any[]>;

  contactformPacienti!: FormGroup;
  isSubmit = true;
  submitMessage='';
  patients!: Observable<Pacient[]>;

  contactformTratamente!:FormGroup;


  private myformPacienti!: CollectionReference<any>;
  userData!: Observable<any[]>;

  private myformTratament!: CollectionReference<any>;
  tratamente!: Observable<any[]>;
  
  constructor(private formBuilder: FormBuilder, private firestore: Firestore){
    this.getPacientDocument();
    this.getOrders();
  }

  showForm(formName: string) {
    this.showForm2 = formName === 'form2';
    this.showForm3 = formName === 'form3';
    this.showForm4 = formName === 'form4';
    this.showForm5 = formName === 'form5';
  }
  
  ngOnInit(): void {
    
    this.myformPacienti = collection(this.firestore, 'pacienti');

    this.contactformPacienti = this.formBuilder.group({
      nume: [null, Validators.required],
      prenume : [null, Validators.required],
      varsta : [null, Validators.required],
      cnp : [null, Validators.required],
      adresa : [null, Validators.required],
      numarDeTelefon : [null, Validators.required],
      email : [null, Validators.required],
      profesie : [null, Validators.required],
      locDeMunca : [null, Validators.required],
      
    });

    this.myFormOrders = collection(this.firestore, 'orders');

    this.contactFormOrders = this.formBuilder.group({
      bedNumber: [null, Validators.required],
      id: [ null, Validators.required],
      isOrderFinished: [null, Validators.required],
      medicine: [null, Validators.required],
      patientFirstName: [null, Validators.required],
      patientLastName:[null, Validators.required]
    })
  }
  submitAddPacient(value: any){
    console.log(value);
    
    addDoc(this.myformPacienti, value)
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

getPacientDocument(): void {
  const CollectionInstance = collection(this.firestore, 'pacienti');
  collectionData(CollectionInstance, {idField: 'id'})
  .subscribe(value => {
    console.log(value)
  });

  this.userData = collectionData(CollectionInstance, {idField: 'id'});
}

submitAddOrders(value: any) {
  console.log(value);
  this.ordersId=value.id;
  setDoc(doc(this.firestore, 'orders', this.ordersId.toString()),{
      bedNumber: value.bedNumber,
      id: value.id,
      isOrderFinished: false,
      medicine: value.medicine,
      patientFirstName: value.patientFirstName,
      patientLastName: value.patientLastName
  });
  // addDoc(this.myFormOrders, value)
  //   .then(() => {
  //     this.submitMessage = 'Submitted Successfully!';
  //     this.isSubmit = true;
  //     setTimeout(() => {
  //       this.isSubmit = false;
  //     }, 8000);
  //   })
  //   .catch((err: any) => {
  //     console.log(err);
  //   });

}

getOrders():void{
  const CollectionInstance = collection(this.firestore, 'orders');
  collectionData(CollectionInstance, {idField: 'id'})
  .subscribe(value => {
    console.log(value);
  });

  this.ordersData = collectionData(CollectionInstance, {idField: 'id'});
  console.log(this.ordersData);
}

updateFirstStep(){
  this.isReadOnly = false;
  this.showButton = true;
  this.showButton2 = false;
}

updatePacienti(id3: string, value: any){
  console.log("aci");
  const docInstance = doc(this.firestore, 'pacienti', id3);
  console.log(value);
  const updateDataPac=
  {
    nume: value.nume,
    prenume : value.prenume,
    varsta : value.varsta,
    cnp : value.cnp,
    adresa : value.adresa,
    profesie : value.profesie,
    email: value.email,
    locDeMunca : value.locDeMunca,
    numarDeTelefon : value.numarDeTelefon
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

updateOrders(id4: string, value: any){
  console.log("aci");
  const docInstance = doc(this.firestore, 'orders', id4);
  console.log(value);
  const updateDataPac=
  {
      bedNumber: value.bedNumber,
      id: value.id,
      isOrderFinished: false,
      medicine: value.medicine,
      patientFirstName: value.patientFirstName,
      patientLastName: value.patientLastName
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

deletePacienti(id1: string){
  const docInstance = doc(this.firestore, 'pacienti', id1);
  deleteDoc(docInstance)
  .then(()=> {
    console.log('Data deleted');
  })
}

deleteComenzi(id2: string){
  const docInstance = doc(this.firestore, 'orders', id2);
  deleteDoc(docInstance)
  .then(()=> {
    console.log('Data deleted');
  })
}

}
