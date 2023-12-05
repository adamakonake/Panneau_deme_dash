import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EquipementDialogComponent } from 'src/app/composants/equipement-dialog/equipement-dialog.component';
import { Equipement } from 'src/app/model/equipement';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { AccueilService } from 'src/app/services/accueil.service';
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

  private start : number = 0;
  private end : number = 12;

  constructor(public dialog: MatDialog, private equipementService : EquipementService, private accueilService : AccueilService){}
  
  ngOnInit(): void {
    this.accueilService.pageIndex.next(2);
    this.getEquipements();
    this.equipementService.initTypeEquipement();
    this.equipementService.typesForEquipementCompoent.subscribe((result)=>{
      this.types = result;
    })
  }

  getEquipements(){
    this.equipementService.getAllEquipement().subscribe((result : any)=>{
      this.equipements = result["data"];
      this.searchResult = this.equipements.slice(0,12);
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

  public getServerData(event?:PageEvent){
    
    if(event?.pageIndex! > event?.previousPageIndex!){
      this.start = this.start+12;
      this.end = this.end+12;
      this.searchResult = this.equipements.slice(this.start,this.end)
    }else{
      this.start = this.start-12;
      this.end = this.end-12;
      this.searchResult = this.equipements.slice(this.start,this.end)
    }

    return event;
  }

}
