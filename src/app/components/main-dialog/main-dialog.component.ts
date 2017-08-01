import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'ac-main-dialog',
  template: ''
})
export class MainDialogComponent implements OnInit {
  dialogRef = {};

  constructor(public dialog: MdDialog) {
    // Do stuff
  }

  ngOnInit() {
    this.dialogRef = this.dialog.open(MainDialogInnerComponent);
    // this.dialogRef.afterClosed().subscribe(result => {
    //
    // });
  }
}

@Component({
  selector: 'ac-main-dialog-inner',
  templateUrl: './main-dialog.component.pug',
})
export class MainDialogInnerComponent {
  article = {
    code: 'new-phantom',
    name: 'Представлен новый Rolls-Royce Phantom',
    image: {
      url: 'https://motor.ru/imgs/2017/07/28/07/1350927/05adabf65dd6cbf720122681378c6ff521dc3358.jpg'
    }
  };

  constructor(public dialogRef: MdDialogRef<MainDialogInnerComponent>) {}
}
