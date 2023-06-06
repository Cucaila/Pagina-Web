import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collectionData, collection, CollectionReference, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';

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
  showForm5 = false;

  contactForm!: FormGroup;
  isSubmit = true;
  submitMessage='';

  private myform!: CollectionReference<any>;
  userData!: Observable<any[]>;

  private myformPacienti!: CollectionReference<any>;
  pacienti!: Observable<any[]>;
  usrData!: Observable<any[]>

  constructor(private formBuilder: FormBuilder, private firestore: Firestore){
    this.getDocument();
  }
  

  showForm(formName: string) {
    this.showForm1 = formName === 'form1';
    this.showForm2 = formName === 'form2';
    this.showForm3 = formName === 'form3';
    this.showForm4 = formName === 'form4';
    this.showForm5 = formName === 'form5';
  }

  showTratament(){
  }

  ngOnInit(): void {

    this.myform = collection(this.firestore, 'medici');

    this.contactForm = this.formBuilder.group({
      nume:[null,Validators.required],
      prenume:[null,Validators.required],
      departament:[null,Validators.required],
      varsta:[null,[Validators.required]]
    });

    this.myformPacienti = collection(this.firestore, 'pacienti');

    this.contactForm = this.formBuilder.group({
      nume: [null, Validators.required],
      prenume : [null, Validators.required],
      medic : [null, Validators.required],
      varsta : [null, Validators.required],
      cnp : [null, Validators.required],
      adresa : [null, Validators.required],
      profesie : [null, Validators.required],
      locDeMunca : [null, Validators.required],
      numarDeTelefon : [null, Validators.required]
    });
   

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
    collectionData(CollectionInstance)
    .subscribe(value => {
      console.log(value)
    });

    this.userData = collectionData(CollectionInstance);
  }

  submitAddPacient(value: any){
    console.log(value);
 
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

getPacientDocument(): void {
  const CollectionInstance = collection(this.firestore, 'pacienti');
  collectionData(CollectionInstance)
  .subscribe(value => {
    console.log(value)
  });

  this.userData = collectionData(CollectionInstance);
}
  

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


}

