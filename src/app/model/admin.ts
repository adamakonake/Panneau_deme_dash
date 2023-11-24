export class Admin {

    idAdministrateur? : number;
    nom? : string;
    prenom? : string;
    email? : string;
    motDePasse? : string;
    telephone? : string;
    superAdmin? : boolean;
    active? : boolean;
    photo? : string;
    superAdministrateur? : Admin;

    constructor(idAdministrateur? : number,nom? : string, prenom? : string, email? : string, motDePasse? : string, telephone? : string, superAdmin? : boolean, active? : boolean, photo? : string, superAdministrateur? : Admin){
        this.idAdministrateur = idAdministrateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.telephone = telephone;
        this.superAdmin = superAdmin;
        this.active = active;
        this.photo = photo;
        this.superAdministrateur = superAdministrateur
    }
}
