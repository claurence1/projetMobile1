import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, Inject, OnDestroy } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { Categorie } from '../models/categorie';
import { Documents } from '../models/documents';
import { Rules } from '../models/rules';
import { DocumentsService } from '../services/documents.service';
import { CategorieService } from '../services/categorie.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { RuleService } from '../services/rule.service';
import { NavbarService } from '../services/navbar.service';
import { RuleCreateComponent } from '../rule-create/rule-create.component';




@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DocumentsListComponent implements OnDestroy  {
  ngOnDestroy(): void {
  
  }

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('parentTables') parentTables: QueryList<MatTable<Documents>>;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Rules>>;

  dataSource: MatTableDataSource<Documents>;
  documentsData: Documents[] = [];
  columnsToDisplay = ['identifiant', 'title', 'categorie', 'version', 'updatedAt', 'Ajout Règle','delete'];
  innerDisplayedColumns = ['title', 'description', 'updatedAt', 'delete'];
  expandedElement: Documents | null;
  categories: Categorie[] = [];
  selectedDocument: Documents | any;
  deletedRules: Rules[] = [];
  public selected = "all";
  public textTitreForm = "Liste de Documents";
  
  constructor(
    private cd: ChangeDetectorRef,
    private documentService: DocumentsService,
    private categoriesServies: CategorieService,
    private router: Router,
    public dialog: MatDialog,
    public rulesService: RuleService,
    private nav: NavbarService
  ) { 
    this.selectedDocument = {
      id_documents: -1,
    };
    
  }

  ngOnInit() {
    this.nav.context = 'Documents';
    this.refresh();
  }

  refresh(){
    this.documentsData = [];
    this.dataSource = new MatTableDataSource();
    this.categoriesServies.getAllCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
  });

  this.documentService
    .getDocuments()
    .subscribe((data: Documents[]) => {
      
      data.forEach(user => {
        if (user.rules && Array.isArray(user.rules) ) {
            this.documentsData = [...this.documentsData, {...user, rules: new MatTableDataSource(user.rules)}];
        } else {
          this.documentsData = [...this.documentsData, user];
        }
      });
      this.dataSource = new MatTableDataSource(this.documentsData);
      this.dataSource.sort = this.sort;
    });

    this.documentService
      .getDocuments()
      .subscribe((data: Documents[]) => {
        data.forEach(user => {
          if (user.rules && Array.isArray(user.rules) ) {
              this.documentsData = [...this.documentsData, {...user, rules: new MatTableDataSource(user.rules)}];
          } else {
            this.documentsData = [...this.documentsData, user];
          }
        });
        this.dataSource = new MatTableDataSource(this.documentsData);
        this.dataSource.sort = this.sort;

      });

  }

  toggleRow(element: Documents) {
    element.rules && (element.rules as MatTableDataSource<Rules>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table) =>  (table.dataSource as MatTableDataSource<Rules>) = new MatTableDataSource((table.dataSource as MatTableDataSource<Rules>).filteredData.filter((f:Rules) => !this.deletedRules.includes(f)))); 
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Rules>).sort = this.innerSort.toArray()[index]);
    this.selectedDocument = element;
  }

  goToDetailView(element: Rules) {
    const elementId = element.id;
    this.router.navigate([`/documents/rule/${elementId}`]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Rules>).filter = filterValue.trim().toLowerCase());
  }

  applyFilterDocuments(filterValue: string) {
    this.parentTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Documents>).filter = filterValue.trim().toLowerCase());
  }

  customFilter(data) {
    // console.log(data);
    // console.log(" filter table :   ", this.filterByCategories(data.value));
    this.parentTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Documents>) = new MatTableDataSource( this.filteringTable( this.filterByCategories(data.value))));
  }

  filteringTable( categorie: string) {
    return categorie === 'all' ?  this.documentsData : this.documentsData.filter(d => d.categorie.toLowerCase() === categorie[0].toLowerCase());
  }

  filterByCategories(idCategorie: string): any {
    const dataFiltered = [];
    if ( idCategorie === 'all' ) {
      return 'all';
    } else {
      this.categories.forEach(element => {
        const obj = element.id === parseInt(idCategorie) ? element.name : undefined;
        if (obj) {
          dataFiltered.push(obj);
        }
      });
      return dataFiltered;
    }
  }

  openDialog(): void {
    const dialogCreateDocument = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px', 
      data: this.categories 
    });
    dialogCreateDocument.afterClosed().subscribe( res => {
      this.refresh();
    }); 
  }

  deleteRule(data){
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Avertissement',
      text: 'Êtes-vous sûr de supprimer cette règle ?'
    }
    const dialogRegle = this.dialog.open(WarningDialogComponent, dialogConfig);
    dialogRegle.afterClosed().subscribe(res => {
      if (res === 'OK'){
        this.cd.detectChanges();
        this.rulesService.deleteRulesById(data['id']);
        this.deletedRules.push(data);
        // filter the deleted value 
        this.innerTables.forEach((table) =>  (table.dataSource as MatTableDataSource<Rules>) = new MatTableDataSource((table.dataSource as MatTableDataSource<Rules>).filteredData.filter((f:Rules) => !this.deletedRules.includes(f)))); 
      }
    })
  }

  deleteDocuments(id_documents, data) {
    console.log(data);
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Avertissement',
      text: 'Êtes-vous sûr de supprimer ce document ?'
    }

    const dialogConfig2: MatDialogConfig = new MatDialogConfig();
    dialogConfig2.disableClose = true;
    dialogConfig2.data = {
      title: 'Avertissement',
      text: ' Attention ce document comporte encore des règles, supprimez les regles avant desupprimer le document'
    }
    const dialogRef = this.dialog.open(WarningDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'OK') {
        if ( data.rules.filteredData.length == 0){
          this.cd.detectChanges();
          this.documentService.deleteDocument(id_documents);
          this.parentTables.forEach((table, index) =>  (table.dataSource as MatTableDataSource<Documents>) = new MatTableDataSource((table.dataSource as MatTableDataSource<Documents>).filteredData.filter((f, index) => f != data) )); 

        }else {
          const dialogNext = this.dialog.open(WarningDialogComponent, dialogConfig2);
          dialogNext.afterClosed().subscribe(res => {
            if (res === 'OK') {
              
            }
          })
        }
      }
    });
    console.log('delete Document id : '+ id_documents );
  }

  addRule() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRegle = this.dialog.open(RuleCreateComponent, dialogConfig);
    dialogRegle.afterClosed().subscribe(res => {

    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  documentForm: FormGroup;
  constructor(
    public documentService: DocumentsService,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Categorie[]) {
      this.createForm();
    }

createForm(){
  this.documentForm = this.fb.group({
    title: ['', Validators.required],
    version: ['', Validators.required],
    categorie: ['', Validators.required] 
  })
}
  
  getCategorieSelected( categorie ){
    this.documentForm.get('categorie').setValue(categorie.value);
  }

  submit(){
    if(this.documentForm.valid){
      this.documentService.createDocument({title: this.documentForm.get('title').value, version: this.documentForm.get('version').value, revision: 0, categorieId: this.documentForm.get('categorie').value});
      this.dialogRef.close();
    }
   
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}




