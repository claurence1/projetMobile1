import { Component, OnInit } from '@angular/core';
import { RuleService } from '../services/rule.service';
import { DocumentsService } from '../services/documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rules } from '../models/rules';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Updates } from '../models/updates';
import { NavbarService } from '../services/navbar.service';
import { UpdatesService } from '../services/updates.service';

@Component({
  selector: 'app-detail-view-rule',
  templateUrl: './detail-view-rule.component.html',
  styleUrls: ['./detail-view-rule.component.css']
})
export class DetailViewRuleComponent implements OnInit {

  public parentRules: any;
  public linkedRules: any;
  public linkedDocument: any;
  public ruleForm: FormGroup;
  public ruleId: string;
  public rule: any;
  public dataSource: any;
  public displayedColumns: string[];

  constructor(private ruleService: RuleService, 
    private documentsService: DocumentsService, 
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    private nav: NavbarService,
    private updateService: UpdatesService) {
    this.displayedColumns = ['exception'];
    this.createForm();
  }

   ngOnInit() {
     this.ruleId = this.route.snapshot.paramMap.get('id');
     this.ruleService.getRuleById(this.ruleId).subscribe(rule => {
       this.rule = rule;
       console.log(this.rule.exception)
       this.rule.exception = JSON.parse(this.rule.exception);
       this.dataSource = this.rule.exception;
       this.ruleForm.patchValue(this.rule);
       if (this.rule.DocumentId) {
         this.documentsService.getOneDocument(this.rule.DocumentId).subscribe(document => {
           this.linkedDocument = document;
           this.ruleForm.get('version').setValue(this.linkedDocument.version);
         });
       }
       if (this.rule.RuleId) {
         this.ruleService.getRuleById(this.rule.RuleId).subscribe(rule => {
           this.linkedRules = rule;
         });
       }
       if (this.rule.ParentId) {
         this.ruleService.getRuleById(this.rule.ParentId).subscribe( _parentRule => {
           this.parentRules = _parentRule;
         });
       }
     });
  }

  ngOnSubmit(ruleToUpdate: Rules) {
    // ruleToUpdate.description = this.ruleForm.get('title').value;
    // ruleToUpdate.description = this.ruleForm.get('exception').value;
    // ruleToUpdate.description = this.ruleForm.get('description').value;
    // this.ruleService.updateOneRule(ruleToUpdate).subscribe(_ruleToUpdate => {
    // }, error => console.log('Error: ', error));
    const update = new Updates(null, 2, 1, parseInt(this.ruleId), this.nav.currentUser.id, new Date(), new Date(), this.ruleForm.get('description').value, JSON.stringify(this.ruleForm.get('exception').value), this.ruleForm.get('title').value, ruleToUpdate.DocumentId, ruleToUpdate.parentRule)
    this.updateService.insertUpdate(update).subscribe(_update => { this.nav.updateDemandeValidation();this.router.navigate(['/documents'])})
  }

   createForm() {
      this.ruleForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        exception: [''],
        version: ['', Validators.required],
        textException: ['']
      });
   }

  addException(exception: string) {
    if (exception) {
      this.dataSource.push(exception);
      this.dataSource = JSON.parse(JSON.stringify(this.dataSource));
    }

    this.ruleForm.get('textException').setValue('')
  }
}
