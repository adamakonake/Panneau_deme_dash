import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-validation-mail-page',
  templateUrl: './validation-mail-page.component.html',
  styleUrls: ['./validation-mail-page.component.css']
})
export class ValidationMailPageComponent implements OnInit {

  formValidCode = this.formBuilder.group({
    code : ['',Validators.required],
  });

  submitted = false;
  data : any;

  constructor(private formBuilder : FormBuilder, private route : Router, private adminService : AdminService){
    this.data = this.route.getCurrentNavigation()!.extras.state;
  }

  ngOnInit(): void {}

  get f(): { [key: string]: AbstractControl } {
    return this.formValidCode.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formValidCode.invalid) {
      return;
    }

    if(this.formValidCode.value["code"]! != this.data.code){
      this.formValidCode.controls["code"].setErrors({'incorrect' : true});
      return ;
    }

    this.route.navigateByUrl("/reset-page",{state:{email : this.data.email}});

  }

  resendCode(){
    this.adminService.forgotPassword(this.data.email).subscribe((result : any)=>{
      this.data.code = result["message"];
    });
    
  }

}
