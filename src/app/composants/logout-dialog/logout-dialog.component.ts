import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccueilComponent } from 'src/app/accueil/accueil.component';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent {

  constructor(public dialogRef: MatDialogRef<AccueilComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  closeDialog(){
    this.dialogRef.close();
  }

  logOut(){
    this.dialogRef.close({"status" : "succes"});
  }

}
