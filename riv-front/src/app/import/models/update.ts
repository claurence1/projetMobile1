export class Update {
    type: string;
    by: string;
    number: string;
    at: string;
    constructor(type, by, number, at) {
        this.type = type;
        this.by = by;
        this.number = number;
        this.at = at;
    }
}