import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class DialogOverviewComponent{
  animal!: string;
  name!: string;
  passCheck: string='';
  dialogRef!: MatDialogRef<DialogOverviewComponent, any>
  dia!: false;

  constructor(public dialog: MatDialog, private router: Router) {}

  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '600px',
      data : {
        passCheck: 'parola'
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.passCheck=result
    });
  }

  goToRegister(){
    console.log(this.passCheck);
    if(this.passCheck == 'parola')
    {
      this.router.navigate(['/register']);
      console.log("am ajuns aici");
    }
    else
    {
      alert("Parola gresita. Daca nu aveti drepturi admin nu puteti utiliza acest camp!");
    }
    }
    
}


