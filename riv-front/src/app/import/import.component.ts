import { Component, OnInit, AfterViewInit } from '@angular/core';
import { convertToHtml } from "mammoth";
import * as $ from 'jquery';
import { Import } from './models/import';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Rule } from './models/rule';
import { Update } from './models/update';
import { ImportService } from './services/import.service';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit, AfterViewInit {

  // document
  public importFile: any;

  // import values from document
  importValues: Import = new Import();

  // html formated document
  public document: any;
  public testtest = function(html): any {
    $('#documentHtml').val(html);
    $('#documentHtml').trigger('input');
    $('#documentHtml').trigger('change');
    return html;
  }

  dataloaded = false;

  constructor(
    public importService: ImportService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    // --
  }

  ngAfterViewInit(): void {
    $('#documentHtml').on('change', (e) => {
      this.document = $('#documentHtml').val();
      
      // parse document here
      var jqueryDocument = $('<div class="body">' + this.document + '</div>');
      this.getDocumentTitle(jqueryDocument);
      this.getDocumentVersion(jqueryDocument);
      this.getDocumentRevision(jqueryDocument);
      this.getDocumentIdentifier(jqueryDocument);
      this.getDocumentRevision(jqueryDocument);
      this.getDocumentCategorie(jqueryDocument);
      this.getDocumentRules(jqueryDocument);
      this.getDocumentUpdate(jqueryDocument);

      this.uploadDocument();

      console.log(this.importValues);
    })
  }

  uploadDocument(): void {
    this.dataloaded = true;
    this.importService.importDocument(this.importValues).subscribe(r => {
      $('#documentHtml').val('');
      console.log(r)
      this.dataloaded = false;
      this.importFile = null;

      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        title: 'Avertissement',
        text: 'le document ' + this.importValues.name + ' a été importé avec succès !'
      }
      this.dialog.open(WarningDialogComponent, dialogConfig);

      this.importValues = new Import();
    }, err => {

      let dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        title: 'Avertissement',
        text: 'Une erreur est survenue lors de l\'import veuillez réessayer !'
      }
      this.dialog.open(WarningDialogComponent, dialogConfig);
      
      $('#documentHtml').val('');
      this.importFile = null;
      this.dataloaded = false;
      this.importValues = new Import();
    });
  }

  // --
  getDocumentTitle(h: any): boolean {
    let title = h.filter('.body').find('p:first').text().split('.')[1];
    this.importValues.name = title;    
    return true;
  }

  // get document version
  getDocumentVersion(h: any): boolean {
    let version = h
    .filter(".body")
    .find("p:first")
    .next()
    .text();
    // console.log(version.match(/(version \d+)/i));
    if(version.match(/(version \d+)/i)) {
      version = version.match(/(version \d+)/i)[0];
      version = version.split(' ')[1]; // dangereux;
      this.importValues.version = version;
      return true;
    }
    return false;
  }

  // get revision of the document
  getDocumentRevision(h: any): boolean {
    let revision = h
    .filter(".body")
    .find("p:first")
    .next()
    .text();
    if(revision.match(/([^_][^_]vision \d+)/i) != null) {
      revision = revision.match(/([^_][^_]vision \d+)/i)[0];
      revision = revision.split(' ')[1]; // dangereux
      this.importValues.revision = revision;
      return true;
    }
    return false;
  }

  // get document identifier
  getDocumentIdentifier(h: any): boolean {
    let identifier = h
    .filter(".body")
    .find("p:first")
    .text()
    .split('.')[0];
    if(identifier) {
      identifier.replace(/\s/g,'');
      this.importValues.identifier = identifier;
      console.log(identifier);
      return true;
    }
    return false;
  }

  // get document categories
  getDocumentCategorie(h: any): boolean {
    let categorie = h
    .filter(".body").find("p:first").text().split('.')[0];
    categorie = categorie.replace(/\s/g,'');
    categorie = categorie.split('-')
    if(categorie.length > 0)
    {
      this.importValues.categorie = categorie[0];
      return true;
    }
    return false;
  }

  // get document rules
  getDocumentRules(h: any): boolean {
    h.find('h2').each((i, elem) => {
      let matchException = $(elem).next().next().text();
      let exceptions: string[] = [];
      if(matchException.includes('Exception')) {
        $(elem).next().next().next().find('li').each((j, jelem) => {
          exceptions.push($(jelem).text().toString())
        });
      }
      this.importValues.rules.push(new Rule($(elem).text(), $(elem).next().text(), JSON.stringify(exceptions)));
    });
    return true;
  }

  // get document update
  getDocumentUpdate(h: any): void {
    let htmUpdate = h.find('tr');
    htmUpdate.each((i, elem) => {
      let number = 
      $(elem).find('td:nth-child(2)').text().split(' ')[1] != null ? 
      $(elem).find('td:nth-child(2)').text().split(' ')[1] : 0;

      this.importValues.updates.push(new Update(
        $(elem).find('td:nth-child(2)').text(),
        $(elem).find('td:first').text(),
        number,
        $(elem).find('td:nth-child(3)').text()
      ));
    });
  }

  // buffer to html
  handleTest(event, callback): any {
    this.readFileInputEventAsArrayBuffer(event, 
      function(arrayBuffer) {
        convertToHtml({arrayBuffer: arrayBuffer}).then((result) => {
          callback(result.value);
        }).done();
    });
  }

  // read file as buffer
  readFileInputEventAsArrayBuffer(event, callback) {
    this.importFile = event.target.files[0];
    $('#file').val('');
    let reader = new FileReader();
    reader.onload = (event: Event) => {
      let arrayBuffer = reader.result;
      callback(arrayBuffer);
    };
    reader.readAsArrayBuffer(this.importFile);
  }

}
