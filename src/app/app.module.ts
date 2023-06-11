import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeniuComponent } from './meniu/meniu.component';
import { LoginComponent } from './login/login.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { MeniuPacientComponent } from './meniu-pacient/meniu-pacient.component';

@NgModule({
  declarations: [
    AppComponent,
    MeniuComponent,
    LoginComponent,
    MeniuPacientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



