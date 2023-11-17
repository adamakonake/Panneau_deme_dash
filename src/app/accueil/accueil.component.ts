import { Component, OnDestroy, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { AdminService } from '../services/admin.service';
import { EncryptStorage } from 'encrypt-storage';
import { Router } from '@angular/router';

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

  constructor(private adminService : AdminService, private route : Router){}


  ngOnInit(): void {
    this.admin = encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!) ;  //Object.assign(new Admin(),encryptStorage.getItem('currentAdmin'));
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

  changeIndex(index : number) : void{
    this.index = index;
  }

  goToAccueil(index : number){
    this.changeIndex(index);
    this.route.navigate(['accueil/welcome-page']);
  }

  goToType(index : number){
    this.changeIndex(index);
    this.route.navigate(['accueil/app-typ-equipement']);
  }

  ngOnDestroy(): void {
    encryptStorage.removeItem('currentAdmin');
    encryptStorage.removeItem('isLogin');
    this.adminService.isLogin = false;
  }

}
