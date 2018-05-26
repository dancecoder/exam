'use strict';

import './ExamTaskComponent.css';

class Controller {

  constructor() {
    this.answer = null;
  }

  doAnswer(isValid) {
    this.task.answer = this.answer;    
    this.onAnswer({ 'task': this.task });
  }

  $onChanges(changes) {
    if (changes.task) {
      this.answer = null;
    }
  }

}

export const ExamTaskComponent = {

  template: `
    <form name="answer" novalidate>
      <img ng-src="{{ $ctrl.task.image }}" width="600" height="400" alt="Карточка с вопросом" />
      <input 
        type="text"
        name="usertext"
        ng-model="$ctrl.answer"
        ng-readonly="$ctrl.task.accepted"
        ng-required="true"
        autofocus
      />
      <button role="button" class="colored" ng-click="$ctrl.doAnswer()" ng-disabled="$ctrl.task.accepted || answer.$invalid">Отправить</button>
    </form>
  `,

  bindings: {
    'task': '<',    
    'onAnswer': '&'
  },

  controller: Controller

};