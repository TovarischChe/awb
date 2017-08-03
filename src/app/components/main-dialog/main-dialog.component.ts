import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UIRouter, Transition, StateService } from '@uirouter/angular';

@Component({
  selector: 'ac-main-dialog',
  template: ''
})
export class MainDialogComponent implements OnInit {
  dialogRef = {};

  constructor(private modalService: NgbModal, private transition: Transition, private stateService: StateService) {}

  ngOnInit() {
    this.dialogRef = this.modalService.open(
      MainDialogInnerComponent,
      {
        size: 'lg',
      }
    ).result.then(() => {
      if (this.transition.from().name) {
        this.stateService.go(this.transition.from().name, {notify: false, reload: false});
      } else {
        this.stateService.go('^', {notify: false, reload: false});
      }
    }).catch(() => {
      this.stateService.go('^', {notify: false, reload: false});
    });
  }
}

@Component({
  selector: 'ac-main-dialog-inner',
  templateUrl: './main-dialog.component.pug',
  styles: ['img {max-width: 100%}']
})
export class MainDialogInnerComponent {
  article = {};
  news = [
    {
      code: 'new-phantom',
      name: 'Представлен новый Rolls-Royce Phantom',
      image: {
        url: 'https://motor.ru/imgs/2017/07/28/07/1350927/05adabf65dd6cbf720122681378c6ff521dc3358.jpg'
      }
    },
    {
      code: 'borgward-isabella',
      name: 'Марка Borgward вернет классическую модель «Изабелла»',
      image: {
        url: 'https://motor.ru/imgs/2017/07/27/14/1350681/3d049dabc9149a4fab767b38d29b4fb83b277461.jpg'
      }
    }
  ];

  constructor(public activeModal: NgbActiveModal, private uiRouter: UIRouter) {
    this.article = this.news.find(el => {
      return el.code === this.uiRouter.globals.params.articleCode;
    });
  }

  closeModal() {
    this.activeModal.dismiss();
  }
}
