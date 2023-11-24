import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiUrl : string = "http://localhost:8080/utilisateur";

  constructor(private http : HttpClient) { }

  getUsers(){
    return this.http.get(this.apiUrl+"/list");
  }

}
