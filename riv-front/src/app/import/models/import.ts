import { Rule } from './rule';
import { Update } from './update';

export class Import {
    name: string;
    identifier: string;
    categorie: string;
    version: string;
    revision: string;
    rules: Rule[] = [];
    updates: Update[] = [];
}