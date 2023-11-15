import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Admin } from '../model/admin';
import { HttpClient } from '@angular/common/http';

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

  constructor(private route : Router, private formBuilder : FormBuilder, private adminService : AdminService, private http : HttpClient){}

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
    
    this.http.post(`http://localhost:8080/admin/connect`, { "email": this.formLogin.value["email"], "password": this.formLogin.value["password"] }).subscribe((result : any) => {
      this.adminService.connectAdmin = Object.assign(new Admin(),result["data"]);
      console.log(this.adminService.connectAdmin);
      this.gotToForgotPage();
    },((error) => {
      console.log(error.error.message);
      if(error.error.message == "pass invalid"){
        this.formLogin.controls["password"].setErrors({'incorrect' : true});
      }
      if(error.error.message == "email invalid"){
        this.formLogin.controls["email"].setErrors({'incorrect' : true});
      }
    }));

  }

}
