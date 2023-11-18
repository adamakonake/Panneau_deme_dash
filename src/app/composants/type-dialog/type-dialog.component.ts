import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypEquipementComponent } from 'src/app/accueil/typ-equipement/typ-equipement.component';
import { TypeEquipementService } from 'src/app/services/type-equipement.service';

@Component({
  selector: 'app-type-dialog',
  templateUrl: './type-dialog.component.html',
  styleUrls: ['./type-dialog.component.css']
})
export class TypeDialogComponent {

  constructor(public dialogRef: MatDialogRef<TypEquipementComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

  closeDialog(){
    this.dialogRef.close();
  }
  
}
