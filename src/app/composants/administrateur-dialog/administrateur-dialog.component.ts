import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncryptStorage } from 'encrypt-storage';
import { AccueilComponent } from 'src/app/accueil/accueil.component';
import { AdministrateurComponent } from 'src/app/accueil/administrateur/administrateur.component';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/services/admin.service';
import { ElectricienService } from 'src/app/services/electricien.service';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-administrateur-dialog',
  templateUrl: './administrateur-dialog.component.html',
  styleUrls: ['./administrateur-dialog.component.css']
})
export class AdministrateurDialogComponent {

  selectedFiles?: FileList;
  currentFile?: File;

  formAdmin = this.formBuilder.group({
    nom : [(this.data.administrateur != undefined) ? this.data.administrateur.nom : '',[Validators.required,Validators.minLength(4)]],
    prenom : [(this.data.administrateur != undefined) ? this.data.administrateur.prenom : '',[Validators.required,Validators.minLength(4)]],
    email : [(this.data.administrateur != undefined) ? this.data.administrateur.email : '',[Validators.required,Validators.email]],
    telephone : [(this.data.administrateur != undefined) ? this.data.administrateur.telephone : '',[Validators.required,Validators.minLength(8)]],
    superAdmin : [(this.data.administrateur != undefined) ? this.data.administrateur.superAdmin : 'false',Validators.required],
    oldPassword : [''],
    password : [''],
    confirmation : [''],
    file : [,(this.data.action == "ajout") ? Validators.required : null],
  });

  submitted = false;

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<AdministrateurComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private adminService : AdminService, public dialogRefAcc: MatDialogRef<AccueilComponent>){}

  get f(): { [key: string]: AbstractControl } {
    return this.formAdmin.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formAdmin.invalid) {
      return;
    }

    let administrateur = new Admin();
    administrateur.nom = this.formAdmin.value["nom"]!;
    administrateur.prenom = this.formAdmin.value["prenom"]!;
    administrateur.email = this.formAdmin.value["email"]!;
    administrateur.telephone = this.formAdmin.value["telephone"]!;
    console.log(administrateur);
    if(this.data.action == "modif"){
      const formData: FormData = new FormData();
      if(this.currentFile){
        formData.append("photo",this.currentFile!);
      }else{
        administrateur.photo = this.data.administrateur.photo;
      }
      if(this.formAdmin.value["password"]! != ''){
        if(this.formAdmin.value["password"]!.length < 6){
          this.formAdmin.controls["password"].setErrors({'min' : true});
          return ;
        }
        if(this.formAdmin.value["oldPassword"]!.length == 0){
          this.formAdmin.controls["oldPassword"].setErrors({'vide' : true});
          return ;
        }
        if(this.formAdmin.value["oldPassword"]!.length < 6){
          this.formAdmin.controls["oldPassword"].setErrors({'min' : true});
          return ;
        }
        if(this.formAdmin.value["confirmation"]!.length == 0){
          this.formAdmin.controls["confirmation"].setErrors({'vide' : true});
          return ;
        }
        if(this.formAdmin.value["confirmation"]!.length < 6){
          this.formAdmin.controls["confirmation"].setErrors({'min' : true});
          return ;
        }
        if(this.formAdmin.value["confirmation"]! != this.formAdmin.value["password"]!){
          this.formAdmin.controls["confirmation"].setErrors({'incorrect' : true});
          return ;
        }
        administrateur.motDePasse = this.formAdmin.value["password"];
        formData.append("oldPassword",this.formAdmin.value["oldPassword"]!);
      }else{
        administrateur.motDePasse = this.data.administrateur.motDePasse;
      }

      administrateur.idAdministrateur = this.data.administrateur.idAdministrateur;
      administrateur.superAdministrateur = this.data.administrateur.superAdministrateur;
      administrateur.superAdmin = this.data.administrateur.superAdmin;
      administrateur.active = this.data.administrateur.active;
      formData.append("administrateur",JSON.stringify(administrateur));

      console.log("azertyuihhh")
      
      this.adminService.updateAdmin(formData).subscribe((resultat : any)=>{
        encryptStorage.setItem('currentAdmin', encryptStorage.encryptValue(resultat["data"]) );
        this.dialogRefAcc.close({"status" : "succes"});
      },(error)=>{
        console.log(error);
        if(error.error.message == "exist"){
          this.formAdmin.controls["email"].setErrors({'incorrect' : true});
        }
        if(error.error.message == "wrong"){
          this.formAdmin.controls["oldPassword"].setErrors({'incorrect' : true});
        }
      })
    }
    if(this.data.action == "ajout"){
      administrateur.superAdmin = this.formAdmin.value["superAdmin"] == "false" ? false : true;
      administrateur.superAdministrateur = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!)
      const formData: FormData = new FormData();
      formData.append("administrateur",JSON.stringify(administrateur));
      formData.append("photo",this.currentFile!);
      this.adminService.addAdmin(formData).subscribe((resultat : any)=>{
        this.dialogRef.close({"status" : "succes"});
      },(error)=>{
        console.log(error);
        if(error.error.message == "exist"){
          this.formAdmin.controls["email"].setErrors({'incorrect' : true});
        }
      });
    }

  }

  readURL(): void {
    document.getElementById('file')!.click();
    const reader = new FileReader();
    const fileInput = document.getElementById('file');
    reader.onload = e =>{
        document.getElementById('imgProfil')!.style.backgroundImage = `url('${e.target?.result}')`;
    }
    fileInput!.addEventListener('change', (e : any) =>{
        const f=e.target!.files[0];
        this.currentFile = f;
        reader.readAsDataURL(f);
    });
}

  closeDialog(){
    if(this.data.action == 'ajout'){
      this.dialogRef.close();
    }else{
      this.dialogRefAcc.close();
    }
  }

  supprimer(){
    if(this.data.action == 'disable'){
      this.adminService.updateStatus(this.data.administrateur.idAdministrateur).subscribe((result)=>{
        this.dialogRef.close({"status" : "succes"});
      })
    }else{
      this.adminService.updateAcces(this.data.administrateur.idAdministrateur).subscribe((result)=>{
        this.dialogRef.close({"status" : "succes"});
      })
    }
  }

}
