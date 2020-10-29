import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { BoardAdministrationComponent } from './board-administration/board-administration.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { UsertypesService } from './services/usertypes.service';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';
import { DocumentsListComponent, DialogOverviewExampleDialog } from './documents-list/documents-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ErreurDialogComponent } from './erreur-dialog/erreur-dialog.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ListCategorieComponent } from './list-categorie/list-categorie.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { RuleCreateComponent } from './rule-create/rule-create.component';
import { DetailViewRuleComponent } from './detail-view-rule/detail-view-rule.component';
import { ImportComponent } from './import/import.component';
import { BoardRequestComponent } from './board-request/board-request.component';
import { HistoricRequestComponent } from './historic-request/historic-request.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BoardAdministrationComponent,
    LoginComponent,
    DocumentsListComponent,
    UserCreateComponent,
    ErreurDialogComponent,
    ListCategorieComponent,
    UsersListComponent,
    WarningDialogComponent,
    RuleCreateComponent,
    DetailViewRuleComponent,
    DialogOverviewExampleDialog,
    BoardRequestComponent,
    HistoricRequestComponent,
    ImportComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService, UsertypesService],
  bootstrap: [AppComponent],
  entryComponents: [
    WarningDialogComponent, DialogOverviewExampleDialog, ErreurDialogComponent, RuleCreateComponent
  ]
})
export class AppModule { }
