export class Rules {
    id: number;
    title: string;
    description: string;
    exception: string;
    updated: Date;
    DocumentId: number;
    created: Date;
    bindedRules: string;
    parentRule: number;

    constructor(
    id: number,
    title: string,
    description: string,
    exception: string,
    updated: Date,
    documentId?: number,
    parentRule?: number,
    created?: Date,
    bindedRules?: string){
    this.title = title;
    this.id = id;
    this.description = description;
    this.exception = exception;
    this.updated = updated;
    this.DocumentId = documentId;
    this.created = created;
    this.parentRule = parentRule;
    this.bindedRules = bindedRules;
}
}
