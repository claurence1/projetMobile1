import { MatTableDataSource } from '@angular/material/table';
import { Rules } from './rules';
import { Updates } from './updates';


export class Documents {
    id: number;
    identifiant: string;
    title: string;
    categorie: string;
    updatedAt: Date;
    created: Date;
    version: number;
    revision: number;
    rules: Rules[] | MatTableDataSource<Rules>;
    updates: Updates[] | MatTableDataSource<Updates>;

    constructor(    
        id: number,
        identifiant:string,
        title: string,
        categorie: string,
        updatedAt: Date,
        created: Date,
        version: number,
        revision: number,
        rules: Rules[] | MatTableDataSource<Rules>){
            this.id = id;
            this.identifiant = identifiant;
            this.title = title;
            this.categorie = categorie;
            this.updatedAt = updatedAt;
            this.created = created;
            this.version = version;
            this.revision = revision;
            this.rules = rules;
        }
}
