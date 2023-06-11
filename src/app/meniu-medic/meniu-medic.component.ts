import { Component, OnInit } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app',
  templateUrl: './meniu-medic.component.html',
  styleUrls: ['./meniu-medic.component.css']
})
export class MeniuMedicComponent implements OnInit{

  showForm2 = false;
  showForm3 = false;
  showForm4 = false;

  contactformPacienti!: FormGroup;
  isSubmit = true;
  submitMessage='';

  private myformPacienti!: CollectionReference<any>;
  userData!: Observable<any[]>;
  
  constructor(private formBuilder: FormBuilder, private firestore: Firestore){}

  showForm(formName: string) {
    this.showForm2 = formName === 'form2';
    this.showForm3 = formName === 'form3';
    this.showForm4 = formName === 'form4';
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

  
}
