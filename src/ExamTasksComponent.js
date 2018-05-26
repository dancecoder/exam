'use strict';

import './ExamTasksComponent.css';

class Controller {

  constructor($scope, persistence) {
    this.persistence = persistence;
    this.scope = $scope;    
    this.currentIndex = null;
    this.finished = false;
  }

  doAnswer(task) {    
    this.onAnswer({ 'task': task }).then(() => {      
      this.finished = this.tasks.every( task => task.accepted );
      if (this.finished) {
        this.currentIndex = null;
        this.onFinish();        
      } else {
        this.currentIndex = this.getNextIndex() || this.getPrevIndex();
        this.persistence.data['currentIndex'] = this.currentIndex;
      }
      this.scope.$apply();
    });
  }

  $onChanges(changes) {
    if (changes.tasks && changes.tasks.currentValue.length > 0) {
      this.currentIndex = this.persistence.data['currentIndex'] || 0;
      this.finished = this.tasks.every( task => task.accepted );
    }
  }

  getNextIndex() {
    let next = this.currentIndex;
    while((next++) < this.tasks.length -1) {
      if (this.tasks[next] && !this.tasks[next].accepted) {
        return next;
      }
    }
    return null;
  }

  getPrevIndex() {
    let next = this.currentIndex;
    while((next--) >= 0) {
      if (this.tasks[next] && !this.tasks[next].accepted) {
        return next;
      }
    }
    return null;
  }

  goNext() {
    this.currentIndex = this.getNextIndex();
    this.persistence.data['currentIndex'] = this.currentIndex;
  }
  
  goPrev() {    
    this.currentIndex = this.getPrevIndex();
    this.persistence.data['currentIndex'] = this.currentIndex;
  }
}

export const ExamTasksComponent = {

  controller: Controller,

  bindings: {
    'tasks': '<',
    'resultsUrl': '@',
    'onAnswer': '&',
    'onFinish': '&',
    'onReset': '&',
    'onDurationChange': '&'
  },

  template: `    
    <div ng-if="!$ctrl.finished">
      <exam-timer-component 
        active="true"
        task="$ctrl.tasks[$ctrl.currentIndex]"
        on-duration-change="$ctrl.onDurationChange()"
      ></exam-timer-component>
      <div>
        <button ng-disabled="$ctrl.getPrevIndex() === null" ng-click="$ctrl.goPrev()">Предыдущий\nвопрос</button>
        <exam-task-component
          task="$ctrl.tasks[$ctrl.currentIndex]"
          on-answer="$ctrl.doAnswer(task)"
        ></exam-task-component>
        <button ng-disabled="$ctrl.getNextIndex() === null" ng-click="$ctrl.goNext()">Следующий\nвопрос</button>
      </div>
    </div>
    <div ng-if="$ctrl.finished" class="finished">
      <p>Вы далы ответы на все вопросы</p>
      <button role="button" class="colored" ng-click="$ctrl.onReset()">Пройти тест заново</button>
      <a role="button" class="colored" ng-href="/results">Просмотреть результаты</a>
    </div>
  `

};