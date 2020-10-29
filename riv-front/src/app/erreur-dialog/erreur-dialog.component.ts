import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-erreur-dialog',
  templateUrl: './erreur-dialog.component.html',
  styleUrls: ['./erreur-dialog.component.css']
})
export class ErreurDialogComponent implements OnInit {

  public text: string;
  public title: string;

  constructor(public dialogRef: MatDialogRef<ErreurDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.text = data.text;
    this.title = data.title;
  }

  close(){
    this.dialogRef.close();
  }
  
  ngOnInit() {
  }

}
