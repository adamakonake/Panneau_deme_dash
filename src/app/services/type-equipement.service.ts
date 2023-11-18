import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeEquipement } from '../model/type-equipement';
import { EncryptStorage } from 'encrypt-storage';
import { Admin } from '../model/admin';

export const encryptStorage = new EncryptStorage('secret-key-value',{
  storageType: 'sessionStorage',
});

@Injectable({
  providedIn: 'root'
})
export class TypeEquipementService {

  private apiUrl : string = "http://localhost:8080/type";

  constructor(private http : HttpClient) { }

  addType(titre : string){
    return this.http.post(this.apiUrl+"/create",{"titre" : titre,"administrateur" : encryptStorage.decryptValue<Admin>(encryptStorage.getItem('currentAdmin')!)});
  }

  allType(){
    return this.http.get(this.apiUrl+"/list");
  }

  updateType(type : TypeEquipement){
    console.log("ser",type)
    return this.http.put(this.apiUrl+"/edit",{
      "idTypeEquipement" : type.idTypeEquipement,
      "titre" : type.titre
    });
  }

  deleteType(idType : number){
    return this.http.delete(this.apiUrl+"/delete/"+idType);
  }
}
