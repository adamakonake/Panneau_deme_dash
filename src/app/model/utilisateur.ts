export class Utilisateur {
    idUtilisateur? : number;
    nom? : string;
    prenom? : string;
    email? : string;
    motDePasse? : string;

    constructor(idUtilisateur? : number, nom? : string, prenom? : string, email? : string, motDePasse? : string){
        this.idUtilisateur = idUtilisateur;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.motDePasse = motDePasse;
    }
}
