import { Component, OnInit } from '@angular/core';
import { TypeEquipement } from 'src/app/model/type-equipement';
import { Utilisateur } from 'src/app/model/utilisateur';
import { AccueilService } from 'src/app/services/accueil.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  utilisateurs : Utilisateur[] = [];
  searchResult : Utilisateur[] = [];
  searchValue : string = "";

  constructor(private accueilService : AccueilService, private userService : UtilisateurService){}

  ngOnInit(): void {
    this.accueilService.pageIndex.next(6);
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((result : any)=>{
      this.utilisateurs = result["data"];
      this.searchResult = result["data"];
    })
  }

  search(){
    this.searchResult = this.utilisateurs.filter((ele) => ele.nom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.prenom?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()) || 
    ele.email?.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase()));
  }

}
