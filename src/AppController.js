/* global Promise */

'use strict';

export class AppController {

  constructor($scope, $location, persistence, fetchTasks, postAnswer) {

    this.persistence = persistence;
    this.postAnswer = postAnswer;
    this.fetchTasks = fetchTasks;
    this.scope = $scope;
    this.location = $location;

    this.tasks = [];
    this.initSession();
  }

  initSession() {
    this.tasks = this.persistence.data['tasks'];
    if (this.tasks) {
      return Promise.resolve(this.tasks);
    } else {
      return this.fetchTasks().then((resp) => {
        this.tasks = resp;
        this.persistence.data['tasks'] = this.tasks;
        this.scope.$apply();
        return true;
      });
      // TODO: define catch here for potential network issues
    }
  }

  handleAnswer(task) {
    return this.postAnswer(task).then(resp => {
      task.accepted = true;
      this.persistence.data['tasks'] = this.tasks;
      this.scope.$apply();
      console.log('postAnswer:', resp);
      return task;
    }).catch(reson => {
      task.accepted = false;
      this.persistence.data['tasks'] = this.tasks;
      this.scope.$apply();
      console.log('postAnswer:', reson);
      throw reson;
    });
  }

  handleFinish() {
    this.location.path('/results');
  }

  handleReset() {
    this.tasks = [];
    this.persistence.reset();
    // NOTE: use native reload until the API does not support sessions
    window.location = window.location.pathname;
    //this.initSession().then(() => {
    //  this.location.url('/welcome');
    //  this.scope.$apply();
    //});
  }

  handleDurationChange() {
    if (this.tasks.length > 0) {
      this.persistence.data['tasks'] = this.tasks;
    }
  }
  
}

AppController.$inject = ['$scope', '$location', 'persistence', 'fetchTasks', 'postAnswer'];