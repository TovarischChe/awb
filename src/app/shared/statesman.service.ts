import { Injectable, EventEmitter } from '@angular/core';
import { UIRouter, StateService } from '@uirouter/angular';
// import * as _ from 'lodash';

export class StatesmanEvent {
  constructor(public stateName: string, public stateParams: object) {
  }
}

@Injectable()
export class Statesman {
  private stateBlocker = false;

  public $StateChanged: EventEmitter<StatesmanEvent> = new EventEmitter();

  constructor(private uiRouter: UIRouter, private stateService: StateService) {}

  public go(stateName, stateParams) {
    if (stateParams.page && stateParams.page === 1) {
      stateParams.page = null;
    }
    if (stateName === 'current') {
      stateName = this.uiRouter.globals.$current.name;
    }
    if (
        (this.stateService.href(
            this.uiRouter.globals.$current.name,
            this.uiRouter.globals.params
        ) !== this.stateService.href(stateName, stateParams))
        && !this.stateBlocker) {
      this.stateBlocker = true;
      this.stateService.go(stateName, stateParams, {reload: false, location: true});
      this.$StateChanged.emit(new StatesmanEvent(stateName, stateParams));
      this.stateBlocker = false;
    }
  }
}
