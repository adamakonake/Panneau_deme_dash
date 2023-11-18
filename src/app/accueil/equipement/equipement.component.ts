import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EquipementDialogComponent } from 'src/app/composants/equipement-dialog/equipement-dialog.component';
import { Equipement } from 'src/app/model/equipement';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { EquipementService } from 'src/app/services/equipement.service';
import { TypeEquipementService } from 'src/app/services/type-equipement.service';

@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.component.html',
  styleUrls: ['./equipement.component.css']
})
export class EquipementComponent implements OnInit {

  equipements : Equipement[] = [];
  searchResult : Equipement[] = [];
  types : TypeEquipement[] = [];
  searchValue : string = "";
  sortValue : number = 0;

  constructor(public dialog: MatDialog, private equipementService : EquipementService){}
  
  ngOnInit(): void {
    this.getEquipements();
    this.equipementService.initTypeEquipement();
    this.equipementService.typesForEquipementCompoent.subscribe((result)=>{
      this.types = result;
    })
  }

  getEquipements(){
    this.equipementService.getAllEquipement().subscribe((result : any)=>{
      this.equipements = result["data"];
      this.searchResult = result["data"];
    })
  }

  openDialog(action : string,equipement? : Equipement) {
    const dialogRef = this.dialog.open(EquipementDialogComponent, {
      data: {
        'equipement' : equipement,
        'action' : action,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != undefined){
        this.getEquipements();
      }
    });
  }

  search(){
    this.searchResult = this.equipements.filter((ele) => ele.nom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.marque?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }

  sort(){
    if(+this.sortValue == 0){
      this.searchResult = this.equipements;
    }else{
      this.searchResult = this.equipements.filter((ele) => ele.typeEquipement?.idTypeEquipement == this.sortValue);
    }
  }

}
