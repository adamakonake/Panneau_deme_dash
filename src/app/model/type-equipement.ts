import { Admin } from "./admin";

export class TypeEquipement {
    idTypeEquipement? : number ;
    titre? : string;
    administrateur? : Admin;

    constructor(idTypeEquipement? : number, titre? : string, administrateur? : Admin){
        this.idTypeEquipement = idTypeEquipement;
        this.titre = titre;
        this.administrateur = administrateur;
    }
}
