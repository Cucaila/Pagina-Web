import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeniuComponent } from './meniu/meniu.component';

const routes: Routes = [
  {path:"", redirectTo:"/login", pathMatch:"full"},
  {path:"login", component:LoginComponent},
  {path:"meniu", component:MeniuComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
