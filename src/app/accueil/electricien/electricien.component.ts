import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipement } from 'src/app/model/equipement';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { EquipementService } from 'src/app/services/equipement.service';

@Component({
  selector: 'app-electricien',
  templateUrl: './electricien.component.html',
  styleUrls: ['./electricien.component.css']
})
export class ElectricienComponent {

  equipements : Equipement[] = [];
  searchResult : Equipement[] = [];
  types : TypeEquipement[] = [];
  searchValue : string = "";
  sortValue : number = 0;

  constructor(public dialog: MatDialog, private equipementService : EquipementService){}


  openDialog(action : string,equipement? : Equipement) {
    // const dialogRef = this.dialog.open(EquipementDialogComponent, {
    //   data: {
    //     'equipement' : equipement,
    //     'action' : action,
    //   },
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(result)
    //   if(result != undefined){
    //   }
    // });
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
