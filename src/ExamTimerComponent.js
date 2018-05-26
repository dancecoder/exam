'use strict';

import './ExamTimerComponent.css';

class Controller {

  constructor($scope, $interval, $window) {
    this.scope = $scope;
    this.interval = $interval;
    this.intPromise = null;

    $window.onbeforeunload = event => {
      if (this.task) {
        this.calculate();
        this.onDurationChange();
      }
    };
  }

  $onChanges(changes) {
    // TODO: handle image load event, we should start timer after image loaded!
    if (changes.task && changes.task.previousValue && !changes.task.isFirstChange()) {
      changes.task.previousValue.duration += Date.now() - changes.task.previousValue.start;
      this.onDurationChange();
    }
    if (changes.task && changes.task.currentValue) {
      changes.task.currentValue.start = Date.now();
      this.calculate();
    }
    if (changes.active) {
      if (changes.active.currentValue === true) {
        this.intPromise = this.interval(() => this.calculate(), 1000);
      } else {
        this.interval.cancel(this.intPromise);
      }
    }
  }

  $onDestroy() {
    this.interval.cancel(this.intPromise);
    this.calculate();
    this.onDurationChange();
  }
  

  calculate() {
    if (!this.task) {
      return 0;
    }
    if (this.task.duration === undefined) {
      this.task.duration = 0;
    }
    let now = Date.now();    
    this.task.duration += now - this.task.start;
    this.task.start = now;
  }

}

Controller.$inject = ['$scope', '$interval', '$window'];

export const ExamTimerComponent = {

  controller: Controller,

  bindings: {
    'task': '<',
    'active': '<',
    'onDurationChange': '&'
  },

  template: `
    <span>Потрачено времени</span>
    <exam-duration-component duration="$ctrl.task.duration"></exam-duration-component>
  `

};