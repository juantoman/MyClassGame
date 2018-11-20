Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('badges'),
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('classes'),
      Meteor.subscribe('students'),
      Meteor.subscribe('groups'),
      Meteor.subscribe('randomEvents'),
      Meteor.subscribe('behaviours'),
      Meteor.subscribe('behavioursLog'),
      Meteor.subscribe('store'),
      Meteor.subscribe('convictions'),
      Meteor.subscribe('quotes'),
      Meteor.subscribe('levels'),
      Meteor.subscribe('challenges'),
      Meteor.subscribe('chalPoints'),
      Meteor.subscribe('diary'),
      Meteor.subscribe('notebook'),
      Meteor.subscribe('notebookWork'),
      Meteor.subscribe('images')
      ];
  }
});

//Router.route('/', {name: 'llistaAlumnes'});
Router.route('/', {name: 'index'});
Router.route('/classesPage', {name: 'classesPage'});
//Router.route('/studentClasses', {name: 'studentClasses'});
Router.route('/studentsMainPage', {name: 'studentsMainPage'});
Router.route('/randomEventPage', {name: 'randomEventPage'});
Router.route('/randomEventsList', {name: 'randomEventsList'});
Router.route('/behavioursList', {name: 'behavioursList'});
Router.route('/statisticsPage', {name: 'statisticsPage'});
Router.route('/myNav', {name: 'myNav'});

//Router.route('/submit', {name: 'alumneSubmit'});*/

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'alumnePage'});
Router.onBeforeAction(requireLogin, {only: 'alumneSubmit'});
