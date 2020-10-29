import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.css']
})
export class WarningDialogComponent implements OnInit {

  public title: string;
  public text: string;
  constructor(public dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.title = data.title;
      this.text = data.text;
  }

  ngOnInit() {

  }

  close(value) {
    this.dialogRef.close(value);
  }
}
