import { Injectable, EventEmitter } from '@angular/core';
import { UIRouter, StateService, TransitionService } from '@uirouter/angular';

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

  public go(stateName, stateParams = <any>{}) {
    if (stateParams.page && stateParams.page === 1) {
      stateParams.page = null;
    }
    if (stateName === 'current') {
      stateName = this.uiRouter.globals.$current.name;
    } else if (stateName === 'back') {
      let previousState = this.getPreviousState();
      stateName = previousState.stateName;
      stateParams = previousState.stateParams;
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
    if (this.statesHistory.length) {
      return this.statesHistory[this.statesHistory.length - 1];
    } else {
      return {stateName: '/', stateParams: {}};
    }
  }

  private saveState() {
    if (this.statesHistory.length >= this.savingHistoryOptions.maxLength) { this.statesHistory.shift(); }
    this.statesHistory.push({
      stateName: this.uiRouter.globals.$current.name,
      stateParams: this.uiRouter.globals.params
    });
  }
}
