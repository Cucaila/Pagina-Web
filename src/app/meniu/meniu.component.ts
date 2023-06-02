import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collectionData, collection, CollectionReference, DocumentData, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app',
  templateUrl: './meniu.component.html',
  styleUrls: ['./meniu.component.css']
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

  constructor(private formBuilder: FormBuilder, private firestore: Firestore){}

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
  }

  submitAddMedic(value: any){
    console.log(value);

    //vechea sintaxa
//     this.myform.add(value).then(()=>{this.submitMessage = 'Submitted Successfully!';
//   })
//   .catch((err: any)=>{
// console.log(err);
//   })

//     this.isSubmit = true;
//     this.submitMessage='Submitted Succefully!';
//     setTimeout(()=>{
//       this.isSubmit=false;
//     },8000);
//   }

//noua sintaxa
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


}
