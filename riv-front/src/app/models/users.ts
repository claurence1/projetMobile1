export class Users {

    id: number;
    mail: string;
    firstName: string;
    lastName: string;
    password: string;
    UserTypeId: number;
    createdAt?: Date;
    updatedAt?: Date;
    token?: string;

    constructor(mail: string, password: string, UserTypeId: number, firstName: string, lastName: string, id?: number, createdAt?: Date, updatedAt?: Date, ) {
        this.mail = mail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.id = id;
        this.UserTypeId = UserTypeId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
