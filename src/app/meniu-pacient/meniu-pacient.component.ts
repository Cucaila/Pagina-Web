import { Component, Injectable, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionReference, Firestore, collection } from '@angular/fire/firestore';
import { Observable, filter, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './meniu-pacient.component.html',
  styleUrls: ['./meniu-pacient.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class MeniuPacientComponent implements OnInit{

  pacientData!: Observable<any[]>;
  contactPacienti!: FormGroup;
  private myFormP!: CollectionReference<any>;
  username: string='';
  nume: string='';
  prenume:string='';

  constructor(private db: Firestore, private route: ActivatedRoute){
    // this.getPacientD();
  }

  ngOnInit(): void {
    // this.myFormP = collection(this.fs, 'pacienti');

    // this.contactPacienti = this.fBuilderPatient.group({
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

    this.route.queryParams.subscribe(params => {
      this.username = params['myString'];
      console.log(this.username); // afișează valoarea myString din URL
    });

      const parts = this.username.split('@')[0].split('.');
      this.nume= parts[0];
      this.prenume = parts[1];
      console.log(this.nume);
      console.log(this.prenume);

      this.getPacientD();
  }

  // getPacientD(): void {
  //   const CollectionInstance = collection(this.db, 'pacienti');
  //   collectionData(CollectionInstance)
  //   .subscribe(value => {
  //     const FilteredValue = value.filter(item => (item['nume']  == this.nume) && (item['prenume'] == this.prenume));
  //     console.log(FilteredValue);
  //   });
  
  //   this.pacientData = collectionData(CollectionInstance);
  // }

  getPacientD(): void {
    const CollectionInstance = collection(this.db, 'pacienti');
    console.log('aici');
    const q = query(CollectionInstance, where('prenume', '==', this.prenume));
    console.log(this.prenume);
  
    getDocs(q).then((querySnapshot) => {
      const filteredData = querySnapshot.docs.map((doc) => doc.data());
      console.log(filteredData);
      this.pacientData = of(filteredData);
    });
  }
}
