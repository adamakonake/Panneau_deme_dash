import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../model/admin';
import { EncryptStorage } from 'encrypt-storage';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl : string = "http://localhost:8080/admin";
  // currentAdmin! : Admin;
  isLogin : boolean = (encryptStorage.getItem("isLogin") != undefined) ? encryptStorage.getItem("isLogin")! : false;


  constructor(private http : HttpClient) { }

  connectAdmin(email : string, password : string){
    return this.http.post(`${this.apiUrl}/connect`, { "email": email, "password": password });
  }

}
