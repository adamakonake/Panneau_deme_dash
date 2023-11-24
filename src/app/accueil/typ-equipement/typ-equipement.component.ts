import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { TypeEquipementService } from 'src/app/services/type-equipement.service';
import {MatDialog} from '@angular/material/dialog';
import { TypeDialogComponent } from 'src/app/composants/type-dialog/type-dialog.component';
import { AccueilService } from 'src/app/services/accueil.service';

@Component({
  selector: 'app-typ-equipement',
  templateUrl: './typ-equipement.component.html',
  styleUrls: ['./typ-equipement.component.css']
})
export class TypEquipementComponent implements OnInit {

  types : TypeEquipement[] = [];
  searchResult : TypeEquipement[] = [];
  searchValue : string = "";

  typForm = this.formBuilder.group({
    titre : ['',[Validators.required,Validators.minLength(3),Validators.maxLength(54)]]
  });

  submitted = false;

  isEdit = false;

  editType = new TypeEquipement();

  constructor(private formBuilder : FormBuilder, private typeEquipmentService : TypeEquipementService,public dialog: MatDialog, private accueilService : AccueilService){}

  ngOnInit(): void {
    this.accueilService.pageIndex.next(3);
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

    if(this.isEdit){
      this.editType.titre = this.typForm.value["titre"]!;
      this.typeEquipmentService.updateType(this.editType).subscribe((result)=>{
        this.allTypes();
        //this.typForm.get("titre")!.clearValidators();
        this.submitted = false;
        this.typForm.reset();
        this.editType = new TypeEquipement();
        this.isEdit = false;
        this.typForm.controls["titre"].markAsTouched();
      },(error)=>{
        if(error.error.message == "exist"){
          this.typForm.controls["titre"].setErrors({'incorrect' : true});
        }
      });
    }else{
      this.typeEquipmentService.addType(this.typForm.value["titre"]!).subscribe((result : any) => {
        this.allTypes();
        this.submitted = false;
        this.typForm.reset();
      },((error) => {
        if(error.error.message == "exist"){
          this.typForm.controls["titre"].setErrors({'incorrect' : true});
        }
      }));
    }
    
  }

  allTypes(){
    this.typeEquipmentService.allType().subscribe((result : any) => {
      this.types = result["data"];
      this.searchResult = result["data"];
    })
  }

  changeEdiType(type : TypeEquipement){
    this.editType = type;
    this.typForm.patchValue({titre : type.titre});
    this.isEdit = true;
  }

  cancelEdit(){
    this.editType = new TypeEquipement();
    this.submitted = false;
    this.typForm.reset();
    this.isEdit = false;
  }

  openDialog(type : TypeEquipement) {
    const dialogRef = this.dialog.open(TypeDialogComponent, {
      data: {
        'idType' : type.idTypeEquipement,
        'titre' : type.titre
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.typeEquipmentService.deleteType(type.idTypeEquipement!).subscribe((result)=>{
          this.allTypes();
        })
      }
    });
  }

  search(){
    this.searchResult = this.types.filter((ele) => ele.titre?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }

}
