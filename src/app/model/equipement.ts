import { Admin } from "./admin";
import { TypeEquipement } from "./type-equipement";

export class Equipement {
    idEquipement? : number;
    nom? : string;
    marque? : string;
    puissance? : number;
    tension? : number;
    intensite? : number;
    prix? : number;
    typeEquipement? : TypeEquipement;
    administrateur? : Admin;

    constructor(idEquipement? : number, nom? : string, marque? : string, puissance? : number,
        tension? : number, intensite? : number, prix? : number, typeEquipement? : TypeEquipement, administrateur? : Admin){
            this.idEquipement = idEquipement;
            this.nom = nom;
            this.marque = marque;
            this.puissance = puissance;
            this.tension = tension;
            this.intensite = intensite;
            this.prix = prix;
            this.typeEquipement = typeEquipement;
            this.administrateur = administrateur;
        }
}
