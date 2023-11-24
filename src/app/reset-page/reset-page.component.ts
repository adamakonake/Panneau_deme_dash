import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-reset-page',
  templateUrl: './reset-page.component.html',
  styleUrls: ['./reset-page.component.css']
})
export class ResetPageComponent {

  formReset = this.formBuilder.group({
    password : ['',[Validators.required,Validators.minLength(6)]],
    confirm : ['',Validators.required]
  })

  submitted = false;

  data : any;

  constructor(private formBuilder : FormBuilder, private route : Router, private adminService : AdminService){
    this.data = this.route.getCurrentNavigation()!.extras.state;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formReset.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.formReset.invalid) {
      return;
    }

    if(this.formReset.value["password"]! != this.formReset.value["confirm"]!){
      this.formReset.controls["confirm"].setErrors({'incorrect' : true});
      return ;
    }

    this.adminService.resetPassword(this.data.email,this.formReset.value["password"]).subscribe((result)=>{
      this.route.navigate(['']);
    })

  }

}
