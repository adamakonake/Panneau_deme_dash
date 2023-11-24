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
  codeSend : boolean = false;


  constructor(private http : HttpClient) { }

  connectAdmin(email : string, password : string){
    return this.http.post(`${this.apiUrl}/connect`, { "email": email, "password": password });
  }

  getAdmins(){
    return this.http.get(this.apiUrl+"/list");
  }

  addAdmin(formData : FormData){
    return this.http.post(this.apiUrl+"/create",formData);
  }

  updateAdmin(formData : FormData){
    return this.http.put(this.apiUrl+"/update",formData);
  }

  updateStatus(idAdmin : number){
    return this.http.put(this.apiUrl+"/change/"+idAdmin,null);
  }

  updateAcces(idAdmin : number){
    return this.http.put(this.apiUrl+"/changeState/"+idAdmin,null);
  }

  forgotPassword(email : string){
    return this.http.get(this.apiUrl+"/verifmail?email="+email)
  }

  resetPassword(email : string, password : string){
    return this.http.put(this.apiUrl+"/resetpassword?email="+email+"&password="+password,null);
  }

  getStatistic(){
    return this.http.get(this.apiUrl+"/statistics");
  }

}
