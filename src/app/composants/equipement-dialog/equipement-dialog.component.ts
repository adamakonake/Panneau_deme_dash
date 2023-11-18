import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncryptStorage } from 'encrypt-storage';
import { EquipementComponent } from 'src/app/accueil/equipement/equipement.component';
import { Admin } from 'src/app/model/admin';
import { Equipement } from 'src/app/model/equipement';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { EquipementService } from 'src/app/services/equipement.service';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-equipement-dialog',
  templateUrl: './equipement-dialog.component.html',
  styleUrls: ['./equipement-dialog.component.css']
})
export class EquipementDialogComponent implements OnInit {

  types : TypeEquipement[] = [];

  formEquipement = this.formBuilder.group({
    nom : [(this.data.equipement != undefined) ? this.data.equipement.nom : '',[Validators.required,Validators.minLength(4)]],
    marque : [(this.data.equipement != undefined) ? this.data.equipement.marque : '',[Validators.required,Validators.minLength(4)]],
    puissance : [(this.data.equipement != undefined) ? this.data.equipement.puissance : '',[Validators.required,Validators.min(0)]],
    tension : [(this.data.equipement != undefined) ? this.data.equipement.tension : '',[Validators.required,Validators.min(0)]],
    intensite : [(this.data.equipement != undefined) ? this.data.equipement.intensite : '',[Validators.required,Validators.min(0)]],
    prix : [(this.data.equipement != undefined) ? this.data.equipement.prix : '',[Validators.required,Validators.min(0)]],
    type : [(this.data.equipement != undefined) ? this.data.equipement.typeEquipement.idTypeEquipement : '',Validators.required],
  })

  submitted = false;

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<EquipementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private equipementService : EquipementService){}
  
  ngOnInit(): void {
    this.types = this.equipementService.types;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formEquipement.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formEquipement.invalid) {
      return;
    }

    let equipement = new Equipement();
    equipement.nom = this.formEquipement.value["nom"]!;
    equipement.marque = this.formEquipement.value["marque"]!;
    equipement.puissance = +this.formEquipement.value["puissance"]!;
    equipement.tension = +this.formEquipement.value["tension"]!;
    equipement.intensite = +this.formEquipement.value["intensite"]!;
    equipement.prix = +this.formEquipement.value["prix"]!;
    equipement.typeEquipement = this.types.find((element)=> element.idTypeEquipement == +this.formEquipement.value["type"]);
    equipement.administrateur = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!)
    console.log(equipement);
    if(this.data.action == "modif"){
      equipement.idEquipement = this.data.equipement.idEquipement;
      this.equipementService.updateEquipement(equipement).subscribe((resultat)=>{
        this.dialogRef.close({"status" : "succes"});
      })
    }
    if(this.data.action == "ajout"){
      this.equipementService.addEquipement(equipement).subscribe((resultat)=>{
        this.dialogRef.close({"status" : "succes"});
      },(error)=>{
        if(error.error.message == "exist"){
          this.formEquipement.controls["nom"].setErrors({'incorrect' : true});
        }
      });
    }

  }

  closeDialog(){
    this.dialogRef.close();
  }

  supprimer(){
    this.equipementService.deleteEquipement(this.data.equipement.idEquipement).subscribe((resultat)=>{
      this.dialogRef.close({"status" : "succes"});
    })
  }

}
