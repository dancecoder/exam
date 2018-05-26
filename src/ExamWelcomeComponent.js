'use strict';

import './ExamWelcomeComponent.css'

export const ExamWelcomeComponent = {

  template: `
    <p>Вам будет предложено ответить на ряд вопросов.</p>
    <p>В ходе тестиирования будет учитываться время ответа на каждый вопрос.</p>
    <p>Вы можете пропускать вопросы и возвращаться к ним заново, отстчет времени будет продолжен.</p>
    <a role="button" class="colored" ng-href="/tasks">Начать тестирование</a>
  `

};