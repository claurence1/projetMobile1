import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.css']
})
export class ListCategorieComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'createdAt', 'delete'];
  public categories;
  public formCategorie: FormGroup;
  private categorie: Categorie;

  public textBoutonForm: string;
  public textTitreForm: string;
  constructor(
    private fb: FormBuilder, 
    private categorieService: CategorieService, 
    public dialog: MatDialog) {
    this.categorie = null;
    this.initForm();
    this.loadCategories();
    this.updateTextForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.formCategorie =
      this.fb.group({
        name: ['', Validators.required]
      });
  }

  add() {
    if (this.formCategorie.valid) {
      const name = this.formCategorie.get('name').value;
      if (this.categorie === null) {
        const categorie: Categorie = new Categorie(name)
        this.categorieService.createCategorie(categorie).subscribe(_create => {
          console.log(_create);
          this.loadCategories();
          this.formCategorie.reset();
        });
      } else {
        this.categorie.name = this.formCategorie.get('name').value
        this.categorieService.updateCategorie(this.categorie).subscribe(_update => {
          console.log(_update);
          this.formCategorie.reset();
          this.categorie = null;
          this.updateTextForm();
        });
      }
    }
  }

  loadCategories() {
    this.categorieService.getAllCategories().subscribe(_categories => {
      this.categories = _categories;
    });
  }

  deleteCategorie(categorie: Categorie) {

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Avertissement',
      text: 'Êtes-vous sûr de supprimer la catégorie ?'
    }
    const dialogRef = this.dialog.open(WarningDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'OK') {
        this.categorieService.deleteCategorie(categorie.id).subscribe(_delete => {
          console.log(_delete);
          this.loadCategories();
          this.formCategorie.reset();
        });
      }
    });

  }
  updateForm(categorie: Categorie) {
    this.formCategorie.get('name').setValue(categorie.name);
    this.categorie = categorie;
    this.updateTextForm();
  }

  updateTextForm() {
    if (this.categorie === null) {
      this.textBoutonForm = 'Ajouter';
      this.textTitreForm = 'Ajouter une catégorie';
    } else {
      this.textBoutonForm = 'Modifier';
      this.textTitreForm = 'Modifier la catégorie';
    }
  }
}
