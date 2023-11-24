import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/admin';
import { HttpClient } from '@angular/common/http';
import { EncryptStorage } from 'encrypt-storage';
import { MatDialog } from '@angular/material/dialog';
import { ConnexionDialogComponent } from '../composants/connexion-dialog/connexion-dialog.component';


export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {

  formLogin = this.formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(6)]]
  })

  submitted = false;

  constructor(private route : Router, private formBuilder : FormBuilder, private adminService : AdminService, private http : HttpClient, public dialog: MatDialog){}

  gotToForgotPage(){
    this.route.navigate(['forgot-page']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formLogin.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formLogin.invalid) {
      return;
    }
    
    this.adminService.connectAdmin(this.formLogin.value["email"]!,this.formLogin.value["password"]!).subscribe((result : any) => {
      //this.adminService.currentAdmin = Object.assign(new Admin(),result["data"]);
      //sessionStorage.setItem("currentAdmin",JSON.stringify(result["data"]));
      encryptStorage.setItem('currentAdmin', encryptStorage.encryptValue(result["data"]) );
      encryptStorage.setItem('isLogin',true);
      this.adminService.isLogin = true;
      this.route.navigate(['accueil']);
    },((error) => {
      console.log(error.error.message);
      if(error.error.message == "pass invalid"){
        this.formLogin.controls["password"].setErrors({'incorrect' : true});
      }
      if(error.error.message == "email invalid"){
        this.formLogin.controls["email"].setErrors({'incorrect' : true});
      }
      if(error.error.message == "disabled"){
        const dialogRef = this.dialog.open(ConnexionDialogComponent);
      }
    }));

  }

}
