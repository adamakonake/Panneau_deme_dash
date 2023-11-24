import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Equipement } from 'src/app/model/equipement';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { EquipementService } from 'src/app/services/equipement.service';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';
import { ElectricienDialogComponent } from 'src/app/composants/electricien-dialog/electricien-dialog.component';
import { ElectricienService } from 'src/app/services/electricien.service';
import { Electricien } from 'src/app/model/electricien';
import { AccueilService } from 'src/app/services/accueil.service';

defineComponents(IgcRatingComponent);

@Component({
  selector: 'app-electricien',
  templateUrl: './electricien.component.html',
  styleUrls: ['./electricien.component.css']
})
export class ElectricienComponent implements OnInit {

  electriciens : Electricien[] = [];
  notes : number[] = [];
  nmbreNote : number[] = [];
  searchResult : Electricien[] = [];
  searchValue : string = "";
  sortValue : string = "all";

  constructor(public dialog: MatDialog, private electricienService : ElectricienService, private accueilService : AccueilService){}

  ngOnInit(): void {
    this.accueilService.pageIndex.next(4);
    this.getElectriciens();
  }

  getElectriciens(){
    this.electricienService.getElectriciens().subscribe((result : any)=>{
      this.electriciens = result["data"]["electriciens"];
      this.searchResult = result["data"]["electriciens"];
      this.notes = result["data"]["notes"];
      this.nmbreNote = result["data"]["nmbreNote"];
    })
  }

  openDialog(action : string,electricien? : Electricien) {
    const dialogRef = this.dialog.open(ElectricienDialogComponent, {
      data: {
        'electricien' : electricien,
        'action' : action,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != undefined){
        this.getElectriciens();
      }
    });
  }

  search(){
    this.searchResult = this.electriciens.filter((ele) => ele.nom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.prenom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.email?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }

  sort(){
    console.log(this.sortValue)
    if(this.sortValue == "all"){
      this.searchResult = this.electriciens;
    }else if(this.sortValue == "true"){
      this.searchResult = this.electriciens.filter((ele) => ele.active == true);
    }else{
      this.searchResult = this.electriciens.filter((ele) => ele.active == false);
    }
  }

}
