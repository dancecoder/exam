'use strict';

import './ExamDurationComponent.css';

class Controller {

  constructor() {
    this.minutes = '00';
    this.seconds = '00';
  }

  $onChanges(changes) {    
    if (changes.duration) {
      let d = changes.duration.currentValue;
      this.minutes = String(Math.floor(d / 60000 + 1 / 60)).padStart(2, '0');
      this.seconds = String(Math.floor((d - this.minutes *60000) / 1000) + 1).padStart(2, '0');
    }
  }
}

export const ExamDurationComponent = {

  controller: Controller,

  bindings: {
    'duration': '<'
  },

  template: `    
    <span ng-bind="$ctrl.minutes"></span><span>:</span><span ng-bind="$ctrl.seconds"></span>
  `

};