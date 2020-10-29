import {ErrorHandler, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Import } from '../models/import';

@Injectable({
  providedIn: 'root',
})
export class ImportService implements ErrorHandler {

    private url = '/import';
    
    constructor(private http: HttpClient) {}

    handleError(error) {
        console.log(error);
    }

    public importDocument(document: Import) {
        return this.http.post('http://localhost:3000' + this.url, document);
    }
}