import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-page',
  templateUrl: './forgot-page.component.html',
  styleUrls: ['./forgot-page.component.css']
})
export class ForgotPageComponent {

  formForgot = this.formBuilder.group({
    email : ['',[Validators.required,Validators.email]],
  });

  submitted = false;

  constructor(private formBuilder : FormBuilder, private adminService : AdminService, private route : Router){}

  get f(): { [key: string]: AbstractControl } {
    return this.formForgot.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formForgot.invalid) {
      return;
    }

    this.adminService.forgotPassword(this.formForgot.value["email"]!).subscribe((result : any)=>{
      this.adminService.codeSend = true;
      this.route.navigateByUrl("/validation-mail-page",{state:{email : this.formForgot.value["email"]!,code : result.message}})
    },(error)=>{
      if(error.error.message == "invalid"){
        this.formForgot.controls["email"].setErrors({'incorrect' : true});
      }
    });
    
  }

}
