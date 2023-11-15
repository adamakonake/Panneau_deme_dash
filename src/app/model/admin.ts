export class Admin {

    idAdministrateur? : number;
    nom? : string;
    prenom? : string;
    email? : string;
    motDePasse? : string;
    superAdmin? : boolean;

    constructor(idAdministrateur? : number,nom? : string, prenom? : string, email? : string, motDePasse? : string, superAdmin? : boolean){
        this.idAdministrateur = idAdministrateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
        this.superAdmin = superAdmin;
    }
}
