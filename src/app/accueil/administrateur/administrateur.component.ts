import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { EncryptStorage } from 'encrypt-storage';
import { AdministrateurDialogComponent } from 'src/app/composants/administrateur-dialog/administrateur-dialog.component';
import { Admin } from 'src/app/model/admin';
import { Electricien } from 'src/app/model/electricien';
import { AccueilService } from 'src/app/services/accueil.service';
import { AdminService } from 'src/app/services/admin.service';
import { ElectricienService } from 'src/app/services/electricien.service';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {

  administrateurs : Admin[] = [];
  notes : number[] = [];
  searchResult : Admin[] = [];
  searchValue : string = "";
  sortValue : string = "all";
  currentAdmin! : Admin;

  private start : number = 0;
  private end : number = 12;

  constructor(public dialog: MatDialog, private adminService : AdminService, private accueilService : AccueilService){}
  
  ngOnInit(): void {
    this.accueilService.pageIndex.next(5);
    this.currentAdmin = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!) ;
    this.getAdministrateurs();
  }

  getAdministrateurs(){
    this.adminService.getAdmins().subscribe((result : any)=>{
      this.administrateurs = result["data"];
      this.searchResult = this.administrateurs.slice(0,12);
    })
  }

  openDialog(action : string,administrateur? : Admin) {
    const dialogRef = this.dialog.open(AdministrateurDialogComponent, {
      data: {
        'administrateur' : administrateur,
        'action' : action,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != undefined){
        this.getAdministrateurs();
      }
    });
  }

  search(){
    this.searchResult = this.administrateurs.filter((ele) => ele.nom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.prenom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.email?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }

  sort(){
    console.log(this.sortValue);

    switch(this.sortValue){
      case "all" : this.searchResult = this.administrateurs; break;
      case "active" : this.searchResult = this.administrateurs.filter((ele) => ele.active == true); break;
      case "nonActive" : this.searchResult = this.administrateurs.filter((ele) => ele.active == false); break;
      case "admin" : this.searchResult = this.administrateurs.filter((ele) => ele.superAdmin == false); break;
      case "nonAdmin" : this.searchResult = this.administrateurs.filter((ele) => ele.superAdmin == true); break;
    }
  }

  public getServerData(event?:PageEvent){
    
    if(event?.pageIndex! > event?.previousPageIndex!){
      this.start = this.start+12;
      this.end = this.end+12;
      this.searchResult = this.administrateurs.slice(this.start,this.end)
    }else{
      this.start = this.start-12;
      this.end = this.end-12;
      this.searchResult = this.administrateurs.slice(this.start,this.end)
    }

    return event;
  }

}
