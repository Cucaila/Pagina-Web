import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeniuComponent } from './meniu/meniu.component';
import { Router } from '@angular/router';
import { MeniuPacientComponent } from './meniu-pacient/meniu-pacient.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"login/meniu", component:MeniuComponent},
  {path:"login/meniu-pacient", component:MeniuPacientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
