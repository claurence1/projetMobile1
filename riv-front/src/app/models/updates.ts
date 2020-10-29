export class Updates {
    id: number;
    date: Date;
    TypeUpdateId: number;
    StatusUpdateId: number;
    RuleId: number;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    exception: string;
    title: string;
    DocumentId: number;
    RuleId_bis: number;
    ParentId: number;
    UserId: number;

    constructor(
        id: number,
        TypeUpdateId: number,
        StatusUpdateId: number,
        RuleId: number,
        UserId: number,
        createdAt: Date,
        updatedAt: Date,
        description: string,
        exception: string,
        title: string,
        DocumentId: number,
        ParentId: number
        ) {

        this.id = id;
        this.TypeUpdateId = TypeUpdateId;
        this.StatusUpdateId = StatusUpdateId;
        this.RuleId = RuleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
        this.exception = exception;
        this.title = title;
        this.DocumentId = DocumentId;
        this.ParentId = ParentId;
        this.UserId = UserId;

    }
}
