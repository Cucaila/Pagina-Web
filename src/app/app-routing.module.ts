import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeniuComponent } from './meniu/meniu.component';
import { MeniuPacientComponent } from './meniu-pacient/meniu-pacient.component';
import { MeniuMedicComponent } from './meniu-medic/meniu-medic.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"login/meniu", component:MeniuComponent},
  {path:"login/meniu-pacient", component:MeniuPacientComponent},
  {path:"login/meniu-medic", component:MeniuMedicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
