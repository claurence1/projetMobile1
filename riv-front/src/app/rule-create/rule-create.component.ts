import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rules } from '../models/rules';
import { Documents } from '../models/documents';
import { RuleService } from '../services/rule.service';
import { DocumentsService } from '../services/documents.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material';

// Formulaire permettant la création d'une règle
@Component({
  selector: 'app-rule-create',
  templateUrl: './rule-create.component.html',
  styleUrls: ['./rule-create.component.css']
})
export class RuleCreateComponent implements OnInit {

  // Titre de la page
  title = "Formulaire de création d'une règle";

  // Formulaire de création
  ruleForm: FormGroup;

  // Controller sur le formulaire pour actualiser les règles
  ruleControl = new FormControl();

  // Tableau des règles
  public regles: Rules[] = [];

  // Liste des rules
  public rulesList: any = [];

  // Liste des rules du document
  public rulesByDocument: MatTableDataSource<Rules> | Rules[] = [];

  public rulesParent: Rules[] = [];

  dataSource = this.rulesList;

  // Liste des Documents
  public documentsListe: Documents[];

  // Id de la règle parent
  public parentId: number;

  // Id du document
  public targetDocument: number;

  // Liste des règles associé
  public str: string = '';

  // Constructeur
  constructor(private fb: FormBuilder, private ruleService: RuleService, private documentsService: DocumentsService, public dialogRef: MatDialogRef<RuleCreateComponent>) {
    this.ruleService.getAllRules().subscribe(_rules => {
      this.rulesList = _rules;
    });

    this.documentsService.getDocuments().subscribe((_documents:Documents[]) => {
      this.documentsListe = _documents;
    });
  }

  // Permet de remplir la liste des règlesParents en fonction du document ciblé
  public fillRuleDocuments(documentsCible) {
    console.log(documentsCible);
    this.rulesByDocument = documentsCible.rules;
    this.targetDocument = documentsCible.id_documents;
    console.log(this.targetDocument);
    (this.rulesByDocument as Rules[]).forEach(element => 
      {if(element.parentRule === null){
        this.rulesParent.push(element);
      }}
      );
  }

  public fillParentId(id: number) {
    this.parentId = id;
  }

  // Permet d'initialiser le formulaire de création d'une règle
  ngOnInit() {
    this.ruleForm = this.fb.group({  // Créé une instance de FormGroup
      description: ['', Validators.required],
      exception: ['', Validators.required],
      title: ['', Validators.required],
      rulesId: [''],
      parentRule: ['']
    });
  }

  // Traitement à l'envoi du formulaire depuis l'interface
  ngOnSubmit() {
    this.constructorStringRuleId();
    const rule: Rules = new Rules(
      null,
      this.ruleForm.get('title').value,
      this.ruleForm.get('description').value,
      this.ruleForm.get('exception').value,
      new Date(),
      this.targetDocument,
      this.parentId,
      new Date(),
      this.str);
    this.ruleService.createRule(rule).subscribe(_value => { console.log(_value);  });
    this.closeDialog();
  }

  // Permet de reset le formulaire
  resetRuleForm() {
    this.ruleForm.reset();
  }

  // Permet d'ajouter une règles dans le tableau d'affichage
  public ajoutBindedRegle(rule: Rules) {
    if (this.regles.indexOf(rule)) {
      this.regles.push(rule);
    }
  }

  // Permet de vider la liste des règles
  public viderListeRegle() {
    this.regles = [];
  }

  // Permet d'ajouter une règles dans le tableau d'affichage
  public ajoutParentRegle(rule: Rules) {
    if (this.regles.indexOf(rule)) {
      this.regles.push(rule);
    }
  }

  // Permet de construire la chaine de caractère contenant les id des rules associé à la rule créée
  public constructorStringRuleId() {
    this.regles.forEach(element => this.str += element.id.toString() + ",");
    console.log(this.str);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
