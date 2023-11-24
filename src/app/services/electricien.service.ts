import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Electricien } from '../model/electricien';

@Injectable({
  providedIn: 'root'
})
export class ElectricienService {

  private apiUrl : string = "http://localhost:8080/electricien";

  constructor(private http : HttpClient) { }

  addElectriciens(formData : FormData){
    return this.http.post(this.apiUrl+"/create",formData);
  }

  getElectriciens(){
    return this.http.get(this.apiUrl+"/listAll");
  }

  updateElectricien(formData : FormData){
    return this.http.put(this.apiUrl+"/update",formData);
  }

  changeState(idElectricien : number){
    return this.http.put(this.apiUrl+"/change/"+idElectricien,null);
  }
}
