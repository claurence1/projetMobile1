import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rules } from '../models/rules';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) {   }

  public getRuleById(id) {
    return this.http.get(`${this.server}rules/${id}`);
  }

  public updateOneRule(rule: Rules) {
    return this.http.put(`${this.server}rules/${rule}`, rule);
  }

  public updateRule(rule: Rules) {
    return this.http.put(this.server + 'rules/' + rule.id, rule);
  }

  public createRule(rule: Rules){
    return this.http.post(this.server + 'rules/', rule);
  }

  public getAllRules(){
    return this.http.get<Rules[]>(this.server + 'rules/').pipe(_rules => { return _rules});
  }

  public getRuleByIdDocument(id: number){
    return this.http.get<Rules[]>(this.server + 'rules/findRulesByIdDocument/' + id);
  }
  
  public deleteRulesById(id) {
    this.http.put(`${this.server}rules/custom/${id}`, 'data').subscribe(
      res => {
        console.log('votre regle à bien été supprimer.', res);
      },
      err => {
        console.log("error occured", err);
      }
    );
  }
}
