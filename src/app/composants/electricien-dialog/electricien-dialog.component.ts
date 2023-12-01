import { Component, Inject } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EncryptStorage } from 'encrypt-storage';
import { formatDate } from 'igniteui-angular/lib/core/utils';
import { EquipementComponent } from 'src/app/accueil/equipement/equipement.component';
import { Admin } from 'src/app/model/admin';
import { Electricien } from 'src/app/model/electricien';
import { ElectricienService } from 'src/app/services/electricien.service';
import { EquipementService } from 'src/app/services/equipement.service';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-electricien-dialog',
  templateUrl: './electricien-dialog.component.html',
  styleUrls: ['./electricien-dialog.component.css']
})
export class ElectricienDialogComponent {

  selectedFiles?: FileList;
  currentFile?: File;

  formElectricien = this.formBuilder.group({
    nom : [(this.data.electricien != undefined) ? this.data.electricien.nom : '',[Validators.required,Validators.minLength(4)]],
    prenom : [(this.data.electricien != undefined) ? this.data.electricien.prenom : '',[Validators.required,Validators.minLength(4)]],
    experience : [(this.data.electricien != undefined) ? this.data.electricien.experience : '',[Validators.required,Validators.min(0)]],
    email : [(this.data.electricien != undefined) ? this.data.electricien.email : '',[Validators.required,Validators.email]],
    telephone : [(this.data.electricien != undefined) ? this.data.electricien.telephone : '',[Validators.required,Validators.minLength(8)]],
    latitude : [(this.data.electricien != undefined) ? this.data.electricien.latitude : '',[Validators.required,Validators.min(-90),Validators.max(90)]],
    longitude : [(this.data.electricien != undefined) ? this.data.electricien.longitude : '',[Validators.required,Validators.min(-90),Validators.max(90)]],
    file : [,(this.data.action == "ajout") ? Validators.required : null],
  })

  submitted = false;

  constructor(private formBuilder : FormBuilder, public dialogRef: MatDialogRef<EquipementComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private electricienService : ElectricienService){}
  
  ngOnInit(): void {
    // this.img = document.getElementById("imgProfil");
    // var btnPhoto = document.getElementById('btnPhoto');
    // var imput = document.getElementById("file");

    // btnPhoto!.addEventListener('click',()=>{
    //   console.log("azert");
      
    // })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formElectricien.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formElectricien.invalid) {
      return;
    }

    let electricien = new Electricien();
    electricien.nom = this.formElectricien.value["nom"]!;
    electricien.prenom = this.formElectricien.value["prenom"]!;
    electricien.experience = +this.formElectricien.value["experience"]!;
    electricien.email = this.formElectricien.value["email"]!;
    electricien.telephone = this.formElectricien.value["telephone"]!;
    electricien.latitude = this.formElectricien.value["latitude"]!;
    electricien.longitude = this.formElectricien.value["longitude"]!;
    console.log(electricien);
    if(this.data.action == "modif"){
      const formData: FormData = new FormData();
      if(this.currentFile){
        formData.append("photo",this.currentFile!);
      }else{
        electricien.photo = this.data.electricien.photo;
      }
      electricien.idElectricien = this.data.electricien.idElectricien;
      electricien.administrateur = this.data.electricien.administrateur;
      formData.append("electricien",JSON.stringify(electricien));
      this.electricienService.updateElectricien(formData).subscribe((resultat)=>{
        this.dialogRef.close({"status" : "succes"});
      })
    }
    if(this.data.action == "ajout"){
      electricien.administrateur = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!)
      const formData: FormData = new FormData();
      formData.append("electricien",JSON.stringify(electricien));
      formData.append("photo",this.currentFile!);
      this.electricienService.addElectriciens(formData).subscribe((resultat)=>{
        this.dialogRef.close({"status" : "succes"});
      },(error)=>{
        if(error.error.message == "exist"){
          this.formElectricien.controls["email"].setErrors({'incorrect' : true});
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
    this.dialogRef.close();
  }

  supprimer(){
    this.electricienService.changeState(this.data.electricien.idElectricien).subscribe((resultat)=>{
      this.dialogRef.close({"status" : "succes"});
    })
  }

}
