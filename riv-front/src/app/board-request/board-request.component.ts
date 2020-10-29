import { Component, OnInit, QueryList, ChangeDetectorRef, OnDestroy, ViewChild, ViewChildren } from '@angular/core';
import { MatSort, MatTable, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Documents } from '../models/documents';
import { Categorie } from '../models/categorie';
import { DocumentsService } from '../services/documents.service';
import { CategorieService } from '../services/categorie.service';
import { Router } from '@angular/router';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { UpdatesService } from '../services/updates.service';
import { Updates } from '../models/updates';
import { Rules } from '../models/rules';
import { RuleService } from '../services/rule.service';

@Component({
  selector: 'app-board-request',
  templateUrl: './board-request.component.html',
  styleUrls: ['./board-request.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BoardRequestComponent implements OnDestroy {
  ngOnDestroy(): void {

  }

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('parentTables') parentTables: QueryList<MatTable<Documents>>;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Updates>>;

  public dataSource: MatTableDataSource<Documents>;
  public documentsData: Documents[] = [];
  public columnsToDisplay = ['identifiant', 'title', 'categorie', 'version', 'updatedAt'];
  public innerDisplayedColumns = ['title', 'description', 'date', 'Action'];
  public expandedElement: Documents | null;
  categories: Categorie[] = [];
  selectedDocument: Documents | any;
  public selected = "all";
  public textTitreForm = "Liste de Documents";
  private listeUpdates: Updates[] = [];




  constructor(
    private cd: ChangeDetectorRef,
    private documentService: DocumentsService,
    private categoriesServies: CategorieService,
    private router: Router,
    public dialog: MatDialog,
    private updateService: UpdatesService,
    private ruleService: RuleService,
  ) {
    this.selectedDocument = {
      id_documents: -1,
    }

    // dialog.afterAllClosed.subscribe((res) => {
    //   this.refresh();
    // })
  }

  ngOnInit() {
    this.updateService.getAllUpdates().subscribe(_test => { console.log(_test)})
    this.refresh();
  }

  refresh() {
    this.documentsData = [];
    this.dataSource = new MatTableDataSource();
    this.categoriesServies.getAllCategories().subscribe((data: Categorie[]) => {
      this.categories = data;
    });

    this.updateService.getAllInProgress().subscribe((_updates: Updates[]) => {
      this.listeUpdates = _updates;
      this.listeUpdates.forEach(_update => {
        if (this.documentsData.findIndex(_document => _document.id === _update.DocumentId) === -1) {
          this.documentService.getDocumentById(_update.DocumentId).subscribe((document: Documents) => {
            this.documentsData = [...this.documentsData, { ...document, updates: new MatTableDataSource(_updates.filter(_up => _up.DocumentId === document.id)) }]
            this.dataSource = new MatTableDataSource(this.documentsData);
            this.dataSource.sort = this.sort;
          });
        }
      })
    });
  }

  confirmUpdate(updateToConfirm: Updates) {
    console.log('confirm: ', updateToConfirm);
    this.openConfirmDialog('Etes-vous sûr de valider la mise à jour?').afterClosed().subscribe((result: string) => {
      if(result === 'OK') {
        this.updateService.updateToConfirmUpdate(updateToConfirm).subscribe(_reject => {
          const updateRule = new Rules(updateToConfirm.RuleId, updateToConfirm.title, updateToConfirm.description,updateToConfirm.exception, new Date(), updateToConfirm.DocumentId);
          // updateRule.parentRule = updateToConfirm.pare;
          this.ruleService.updateRule(updateRule).subscribe(_rule => {
            this.refresh();
          });
        });
      }
    });
  }

  rejectUpdate(updateToReject: Updates) {
    console.log('reject: ', updateToReject);
    this.openConfirmDialog('Etes-vous sûr de refuser la mise à jour?').afterClosed().subscribe((result: string) => {
      if(result === 'OK') {
        this.updateService.updateToRejectUpdate(updateToReject).subscribe(_reject => {
          this.refresh();
        });
      }
    });
  }

  openConfirmDialog(text: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Avertissement',
      text: text
    };
    const dialogRef = this.dialog.open(WarningDialogComponent, dialogConfig);
    return dialogRef;
  }

  toggleRow(element: Documents) {
    element.updates && (element.updates as MatTableDataSource<Updates>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Updates>).sort = this.innerSort.toArray()[index]);
    this.selectedDocument = element;
  }

  goToDetailView(element: Updates) {
    var elementId = element['id'];
    this.router.navigate([`/documents/rule/${elementId}`]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Updates>).filter = filterValue.trim().toLowerCase());
  }

  applyFilterDocuments(filterValue: string) {
    this.parentTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Documents>).filter = filterValue.trim().toLowerCase());
  }

  customFilter(data) {
    this.parentTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Documents>) = new MatTableDataSource(this.filteringTable(this.filterByCategories(data.value))));
  }

  filteringTable(categorie: string) {
    return categorie === "all" ? this.documentsData : this.documentsData.filter(d => d.categorie.toLowerCase() === categorie[0].toLowerCase());
  }

  filterByCategories(idCategorie: string): any {
    const dataFiltered = [];
    if (idCategorie === "all") {
      return "all";
    }
    else {
      this.categories.forEach(element => {
        const obj = element.id === parseInt(idCategorie) ? element.name : undefined;
        if (obj) {
          dataFiltered.push(obj);
        }
      });
      return dataFiltered;
    }
  }
}
