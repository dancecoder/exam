'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import './app.css';

import AppController from './AppController';
import PersistenceService from './PersistenceService'
import { ExamTaskComponent } from './ExamTaskComponent';
import { ExamTasksComponent } from './ExamTasksComponent';
import { ExamWelcomeComponent } from './ExamWelcomeComponent';
import { ExamResultsComponent } from './ExamResultsComponent';
import { ExamTimerComponent } from './ExamTimerComponent';
import { ExamDurationComponent } from './ExamDurationComponent';

import { fetchTasks, postAnswer } from './api';


const appModule = angular.module('exam', [ngRoute] );

appModule.controller('AppController', AppController);

appModule.component('examTaskComponent', ExamTaskComponent);
appModule.component('examTasksComponent', ExamTasksComponent);
appModule.component('examWelcomeComponent', ExamWelcomeComponent);
appModule.component('examResultsComponent', ExamResultsComponent);
appModule.component('examTimerComponent', ExamTimerComponent);
appModule.component('examDurationComponent', ExamDurationComponent);

appModule.service('persistence', PersistenceService);
appModule.constant('fetchTasks', fetchTasks);
appModule.constant('postAnswer', postAnswer);

appModule.config(['$locationProvider', '$routeProvider', ($locationProvider, $routeProvider) => {
  $locationProvider.html5Mode(false);

  $routeProvider.when('/welcome', { template: '<exam-welcome-component></exam-welcome-component>' })
                .when('/tasks',   { template: `<exam-tasks-component
                                                 tasks="$ctrl.tasks"
                                                 on-answer="$ctrl.handleAnswer(task)"
                                                 on-finish="$ctrl.handleFinish()"
                                                 on-reset="$ctrl.handleReset()"
                                                 on-duration-change="$ctrl.handleDurationChange()"
                                               ></exam-tasks-component>` })
                .when('/results', { template: `<exam-results-component
                                                 tasks="$ctrl.tasks"
                                                 on-reset="$ctrl.handleReset()"
                                               ></exam-results-component>` })
                .otherwise('/welcome');
}]);

