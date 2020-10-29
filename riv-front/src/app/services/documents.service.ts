import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Documents } from '../models/documents';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor( private router: Router, private http: HttpClient) { }
  public url = 'http://localhost:3000';
  private server = 'http://localhost:3000/';

  getDocuments() {
    return this.http.get(`${this.url}/documents/`);
  }

  getDocumentById(id: number) {
    return this.http.get(this.url + '/documents/' + id);
  }

  public getAllDocuments(){
    return this.http.get<Documents[]>(this.server + 'documents/').pipe(_documents => { return _documents});
  }
 
  createDocument(data) {
    this.http.post(`${this.server}documents`, data)
      .subscribe(
        res => {
          console.log('Votre documents a été créer avec succès.', res);
          this.router.navigate(['documents']);
        },
        err => {
          console.log('Error occured:' , err);
          
        }
      );
  }

  deleteDocument(id) {
    this.http.delete(`${this.server}documents/${id}`).subscribe(
      res => {
        console.log('votre document à bien été supprimer.', res);
      },
      err => {
        console.log("error occured", err);
        
      }
    );
  }

  getOneDocument(id) {
    return this.http.get(`${this.url}/documents/${id}`);
  }

}
