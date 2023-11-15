import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  index : number = 1;
  sideBarreDepilled : boolean = false;

  constructor(){}
  ngOnInit(): void {
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

}
