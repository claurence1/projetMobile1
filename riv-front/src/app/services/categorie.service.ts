import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) {

  }

  public getAllCategories() {
    return this.http.get(this.server + 'categories/').pipe(_categorie => { return _categorie});
  }

  public createCategorie(categorie: Categorie) {
    return this.http.post(this.server + 'categories/', categorie);
  }

  public deleteCategorie(id) {
    return this.http.delete(this.server + 'categories/' + id);
  }

  public updateCategorie(categorie: Categorie) {
    return this.http.put(this.server + 'categories/' + categorie.id, categorie);
  }
}
