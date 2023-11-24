import { Admin } from "./admin";

export class Electricien {

    idElectricien? : number;
    nom? : string;
    prenom?: string;
    experience? : number;
    email? : string;
    telephone? : string;
    photo? : string;
    active? : boolean
    administrateur? : Admin;

    constructor(idElectricien? : number, nom? : string, prenom? : string, experience? : number, email? : string, telephone? : string, photo? : string, active? : boolean, administrateur? : Admin){
        this.idElectricien = idElectricien;
        this.nom = nom;
        this.prenom = prenom;
        this.experience = experience;
        this.email = email;
        this.telephone = telephone;
        this.photo = photo;
        this.active = active;
        this.administrateur = administrateur
    }
}
