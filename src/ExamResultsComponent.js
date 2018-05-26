'use strict';

import './ExamResultsComponent.css';

class Controller {

  constructor() {

  }

  get totalTimeSpent() {
    return this.tasks.reduce((acc, item) => acc += item.duration, 0);
  }

  get finished() {
    return this.tasks.every( task => task.accepted );
  }
  
}

export const ExamResultsComponent = {

  template: `
    <h1>Результаты тестирорвания</h1>
    <div ng-if="$ctrl.finished">
      <div>
        <strong>Всего времени затрачено:</strong>
        <exam-duration-component duration="$ctrl.totalTimeSpent"></exam-duration-component>
      </div>      
      <h2>Ваши ответы</h2>      
      <div ng-repeat="task in $ctrl.tasks" class="accepted-task">
        <img ng-src="{{ task.image }}" width="150" height="100" alt="Карточка с вопросом" />
        <exam-duration-component duration="task.duration"></exam-duration-component>
        <span class="answer" ng-bind="task.answer"></span>
      </div>
      <div>
        <button role="button" class="colored" ng-click="$ctrl.onReset()">Пройти тест заново</button>
      </div>
    </div>
    <div ng-if="!$ctrl.finished">
      <p>Результаты не доступны, вы ответили не на все вопросы.</p>
      <a role="button" class="colored"  ng-href="#!/tasks">Вернуться к вопросам</a>
    </div>    
  `,

  bindings: {
    'tasks': '<',
    'onReset': '&'
  },

  controller: Controller

};