import { Injectable, EventEmitter } from '@angular/core';
import * as _ from 'lodash';

export class ScrollState {
  constructor(public position: number, public direction: boolean, public interval: number) {
  }
}

@Injectable()
export class ScrollService {
  prevScrollPos = 0;
  currScrollPos = 0;
  interval = 0;

  public $WindowScrolled: EventEmitter<ScrollState> = new EventEmitter();
  public $WindowScrolledLeft10: EventEmitter<ScrollState> = new EventEmitter();
  public $WindowScrolledLeft25: EventEmitter<ScrollState> = new EventEmitter();

  private onScrollHandler = () => {
    this.currScrollPos = window.pageYOffset;
    this.interval = this.currScrollPos - this.prevScrollPos;
    this.prevScrollPos = this.currScrollPos;
    this.$WindowScrolled.emit(new ScrollState(this.currScrollPos, this.interval > 0, Math.abs(this.interval)));

    if ((document.body.offsetHeight - window.innerHeight - this.currScrollPos) /
        (window.innerHeight + this.currScrollPos) < 0.1) {
      this.$WindowScrolledLeft10.emit(new ScrollState(this.currScrollPos, this.interval > 0, Math.abs(this.interval)));
    }
    if ((document.body.offsetHeight - window.innerHeight - this.currScrollPos) /
        (window.innerHeight + this.currScrollPos) < 0.25) {
      this.$WindowScrolledLeft25.emit(new ScrollState(this.currScrollPos, this.interval > 0, Math.abs(this.interval)));
    }
  }

  constructor() {}

  public watch = () => {
    window.addEventListener('scroll', _.throttle(this.onScrollHandler, 100));
  }
}
