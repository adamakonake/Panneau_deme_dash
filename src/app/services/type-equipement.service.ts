import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeEquipementService {

  private apiUrl : string = "http://localhost:8080/type";

  constructor(private http : HttpClient) { }

  addType(titre : string){
    return this.http.post(this.apiUrl+"/create",{"titre" : titre});
  }

  allType(){
    return this.http.get(this.apiUrl+"/list");
  }
}
