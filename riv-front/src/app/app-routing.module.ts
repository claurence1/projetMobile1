import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdministrationComponent } from './board-administration/board-administration.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { DetailViewRuleComponent } from './detail-view-rule/detail-view-rule.component';
import { AuthGuard } from './_helpers/auth.guard';
import { RuleCreateComponent } from './rule-create/rule-create.component';
import { BoardRequestComponent } from './board-request/board-request.component';
import { HistoricRequestComponent } from './historic-request/historic-request.component';
import { ImportComponent } from './import/import.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsListComponent, canActivate: [AuthGuard] },
  { path: 'documents/rule/:id', component: DetailViewRuleComponent, canActivate: [AuthGuard] },
  { path: 'ruleCreate', component: RuleCreateComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'userCreate', component: UserCreateComponent },
  {
    path: 'administration',
    component: BoardAdministrationComponent,
    children: [
      {
        path: 'categorie',
        component: ListCategorieComponent
      }, {
        path: 'users',
        component: UsersListComponent,
      }, {
        path: 'request',
        component: BoardRequestComponent
      }, {
        path: 'historique',
        component: HistoricRequestComponent
      }, {
        path: 'importWord',
        component: ImportComponent
      }, { 
        path: 'ruleCreate', 
        component: RuleCreateComponent,
     }],
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'documents', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' },
  { path: 'administration', redirectTo: 'administration/users' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
