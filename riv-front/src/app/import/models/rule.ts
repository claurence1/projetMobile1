export class Rule {
    title: string;
    content: string;
    exceptions: string;
    constructor(title, content, exceptions) {
        this.title = title;
        this.content = content;
        this.exceptions = exceptions;
    }
}