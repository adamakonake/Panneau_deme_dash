import { AfterContentInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';
import { EncryptStorage } from 'encrypt-storage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdministrateurDialogComponent } from '../composants/administrateur-dialog/administrateur-dialog.component';
import { LogoutDialogComponent } from '../composants/logout-dialog/logout-dialog.component';
import { AccueilService } from '../services/accueil.service';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit, OnDestroy {

  index : number = 1;
  sideBarreDepilled : boolean = false;
  admin! : Admin;

  constructor(private adminService : AdminService, private route : Router, public dialog: MatDialog,private accueilService : AccueilService,
    private cd : ChangeDetectorRef){}

  ngOnInit(): void {
    this.admin = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!) ;  //Object.assign(new Admin(),encryptStorage.getItem('currentAdmin'));
    this.accueilService.pageIndex.subscribe((result)=>{
      this.index = result;
      this.cd.detectChanges();
    })
    var sideBarre = document.getElementById("sideBarre");
    var sideBtn = document.getElementById("menuIconDiv");
    var netIcon = document.getElementById("iconNext")
    sideBarre!.style.height = `${window.innerHeight - 78}px`;
    window.addEventListener("resize",()=>{
      sideBarre!.style.height = `${window.innerHeight - 78}px`;
      if(window.innerWidth >= 1090){
        this.sideBarreDepilled = true;
        sideBarre!.style.translate = "0px";
        netIcon!.style.rotate = "180deg"
      }else{
        this.sideBarreDepilled = false;
        sideBarre!.style.translate = "-230px";
        netIcon!.style.rotate = "0deg";
      }
      console.log(window.innerHeight);
    })

    sideBtn?.addEventListener("click", ()=>{
      if(!this.sideBarreDepilled){
        this.sideBarreDepilled = true;
        sideBarre!.style.translate = "0px";
        netIcon!.style.rotate = "180deg"
      }else{
        this.sideBarreDepilled = false;
        sideBarre!.style.translate = "-230px";
        netIcon!.style.rotate = "0deg";
      }
      // if(sideBarre?.classList.contains("sideBarreHide")){
      //   sideBarre?.classList.remove("sideBarreHide");
      //   sideBarre?.classList.add("sideBarreShow");
      // }else{
      //   sideBarre?.classList.remove("sideBarreShow");
      //   sideBarre?.classList.add("sideBarreHide");
      // }
    })
  }

  goToAccueil(){
    this.route.navigate(['accueil/welcome-page']);
  }

  goToType(){
    this.route.navigate(['accueil/typ-equipement']);
  }

  goToEquipement(){
    this.route.navigate(['accueil/equipement']);
  }

  goToElectricien(){
    this.route.navigate(['accueil/electricien']);
  }

  goToAdmin(){
    this.route.navigate(['accueil/administrateur']);
  }

  goToUsers(){
    this.route.navigate(['accueil/utilisateur']);
  }

  openDialog(action : string,administrateur : Admin) {
    const dialogRef = this.dialog.open(AdministrateurDialogComponent, {
      data: {
        'administrateur' : administrateur,
        'action' : action,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != undefined){
        window.location.reload();
      }
    });
  }

  logOut(action : string, administrateur? : Admin){
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      data: {
        'administrateur' : administrateur,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result != undefined){
        encryptStorage.removeItem('currentAdmin');
        encryptStorage.removeItem('isLogin');
        this.adminService.isLogin = false;
        this.route.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    encryptStorage.removeItem('currentAdmin');
    encryptStorage.removeItem('isLogin');
    this.adminService.isLogin = false;
  }

}
