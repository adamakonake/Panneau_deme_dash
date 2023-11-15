import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'any'
})
export class AdminService {

  private apiUrl : string = "http://localhost:8080/admin";
  currentAdmin! : Admin;


  constructor(private http : HttpClient) { }

  connectAdmin(email : string, password : string){
    return this.http.post(`${this.apiUrl}/connect`, { "email": email, "password": password });
  }

}
