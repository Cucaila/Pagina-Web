import { Component, Injectable, OnInit } from '@angular/core';
import { collectionData, getDocs, query, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollectionReference, Firestore, collection } from '@angular/fire/firestore';
import { Observable, filter, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

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

  constructor(private db: Firestore, private route: ActivatedRoute,private auth: AuthService){
  }

  ngOnInit(): void {
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
  logout(){
    this.auth.logout();
  }
}
