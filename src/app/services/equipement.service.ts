import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEquipement } from '../model/type-equipement';
import { Equipement } from '../model/equipement';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  private apiUrl : string = "http://localhost:8080/equipement";

  types : TypeEquipement[]=[];
  typesForEquipementCompoent : Subject<TypeEquipement[]> = new Subject();

  constructor(private http : HttpClient) { }

  initTypeEquipement(){
    this.http.get("http://localhost:8080/type/list").subscribe((result : any)=>{
      console.log(result["data"]);
      this.types = result["data"];
      this.typesForEquipementCompoent.next(result["data"]);
    })
  }

  addEquipement(equipment : Equipement){
    return this.http.post(this.apiUrl+"/create",equipment);
  }

  getAllEquipement(){
    return this.http.get(this.apiUrl+"/list");
  }

  updateEquipement(equipement : Equipement){
    return this.http.put(this.apiUrl+"/update",equipement);
  }

  deleteEquipement(idEquipement : number){
    return this.http.delete(this.apiUrl+"/delete/"+idEquipement);
  }

}
