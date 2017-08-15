import { Injectable, EventEmitter } from '@angular/core';
import { UIRouter, StateService, TransitionService } from '@uirouter/angular';
// import * as _ from 'lodash';

export class StatesmanEvent {
  constructor(public stateName: string, public stateParams: object) {
  }
}

@Injectable()
export class Statesman {
  private stateBlocker = false;
  private statesHistory = [];
  private saveHistory = false;
  private savingHistoryOptions = {
    maxLength: 10
  };

  public $StateChanged: EventEmitter<StatesmanEvent> = new EventEmitter();

  constructor(private uiRouter: UIRouter,
    private stateService: StateService,
    private transitionService: TransitionService) {}

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
      if (this.saveHistory) { this.saveState(); }
      this.stateService.go(stateName, stateParams, {reload: false, location: true});
      this.$StateChanged.emit(new StatesmanEvent(stateName, stateParams));
      this.stateBlocker = false;
    }
  }

  public track() {
    this.saveHistory = true;
    this.transitionService.onStart({to: '**'}, () => {
      this.saveState();
    });
  }

  public getPreviousState() {
    return this.statesHistory[this.statesHistory.length - 1];
  }

  private saveState() {
    if (this.statesHistory.length >= this.savingHistoryOptions.maxLength) { this.statesHistory.shift(); }
    this.statesHistory.push(this.stateService.href(
        this.uiRouter.globals.$current.name,
        this.uiRouter.globals.params));
  }
}
