import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { TypeEquipementService } from 'src/app/services/type-equipement.service';

@Component({
  selector: 'app-typ-equipement',
  templateUrl: './typ-equipement.component.html',
  styleUrls: ['./typ-equipement.component.css']
})
export class TypEquipementComponent implements OnInit {

  types : TypeEquipement[] = [];

  typForm = this.formBuilder.group({
    titre : ['',[Validators.required,Validators.minLength(3)]]
  });

  submitted = false;

  constructor(private formBuilder : FormBuilder, private typeEquipmentService : TypeEquipementService){}

  ngOnInit(): void {
    this.allTypes();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.typForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.typForm.invalid) {
      return;
    }

    this.typeEquipmentService.addType(this.typForm.value["titre"]!).subscribe((result : any) => {
      console.log(Object.assign(new TypeEquipement(),result["data"]!))
      this.allTypes();
    },((error) => {
      console.log(error.error.message);
      if(error.error.message == "exist"){
        this.typForm.controls["titre"].setErrors({'incorrect' : true});
      }
    }))
    
  }

  allTypes(){
    this.typeEquipmentService.allType().subscribe((result : any) => {
      this.types = result["data"];
    })
  }

}
