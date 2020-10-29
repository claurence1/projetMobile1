export class UserTypes {

    id: number;
    libelle: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(libelle: string, id?: number, createdAt?: Date, updatedAt?: Date, ) {
        this.libelle = libelle;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
