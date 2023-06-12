import { Component, OnInit } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
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

    this.myformTratament = collection(this.firestore, 'tratamente');

    this.contactformTratamente = this.formBuilder.group({
      nume: [null, Validators.required],
      prenume : [null, Validators.required],
      numeMedicament : [null, Validators.required],
      administrare : [null, Validators.required],
      durataTratament : [null, Validators.required],
      codPat : [null, Validators.required],
      // comanda : [null, Validators.required],
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
  collectionData(CollectionInstance)
  .subscribe(value => {
    console.log(value)
  });

  this.userData = collectionData(CollectionInstance);
}

submitAddTratament(value: any) {
  console.log(value);
  addDoc(this.myformTratament, value)
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

getTratmentDocument(): void {
  const CollectionInstance = collection(this.firestore, 'tratamente');
  collectionData(CollectionInstance)
  .subscribe(value => {
    console.log(value)
  });

  this.userData = collectionData(CollectionInstance);
}

getOrders():void{
  const CollectionInstance = collection(this.firestore, 'orders');
  collectionData(CollectionInstance, {idField: 'id'})
  .subscribe(value => {
    console.log(value);
  });

  this.ordersData = collectionData(CollectionInstance, {idField: 'id'});
}

}
