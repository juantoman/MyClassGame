Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('allUsers')
      ];
  }
});

//Router.route('/', {name: 'llistaAlumnes'});
Router.route('/', {name: 'index'});
Router.route('/classesPage', {name: 'classesPage',
  waitOn: function() {
    return [
      Meteor.subscribe('classes',Meteor.user().userType),
      Meteor.subscribe('images',Meteor.user().userType),
      Meteor.subscribe('mcgParameters')
      ];
  }
});
//Router.route('/studentClasses', {name: 'studentClasses'});
Router.route('/studentsMainPage', {name: 'studentsMainPage'});
Router.route('/randomEventPage', {name: 'randomEventPage'});
Router.route('/randomEventsList', {name: 'randomEventsList'});
Router.route('/behavioursList', {name: 'behavioursList'});
Router.route('/statisticsPage', {name: 'statisticsPage'});
Router.route('/myNav', {name: 'myNav',
  waitOn: function() {
    return [
      Meteor.subscribe('classes',Meteor.user().userType),
      Meteor.subscribe('badges',Meteor.user().userType),
      Meteor.subscribe('students',Meteor.user().userType),
      Meteor.subscribe('groups',Meteor.user().userType),
      Meteor.subscribe('randomEvents',Meteor.user().userType),
      Meteor.subscribe('behaviours',Meteor.user().userType),
      Meteor.subscribe('behavioursLog',Meteor.user().userType),
      Meteor.subscribe('store',Meteor.user().userType),
      Meteor.subscribe('convictions',Meteor.user().userType),
      Meteor.subscribe('quotes',Meteor.user().userType),
      Meteor.subscribe('levels',Meteor.user().userType),
      Meteor.subscribe('challenges',Meteor.user().userType),
      Meteor.subscribe('chalMissions',Meteor.user().userType),
      Meteor.subscribe('chalPoints',Meteor.user().userType),
      Meteor.subscribe('challengesXP',Meteor.user().userType),
      Meteor.subscribe('diary',Meteor.user().userType),
      Meteor.subscribe('notebook',Meteor.user().userType),
      Meteor.subscribe('notebookWork',Meteor.user().userType),
      Meteor.subscribe('images',Meteor.user().userType),
      Meteor.subscribe('cards',Meteor.user().userType),
      Meteor.subscribe('chromes',Meteor.user().userType),
      Meteor.subscribe('chatClass',Meteor.user().userType),
      Meteor.subscribe('chatTeachers'),
      Meteor.subscribe('notifications',Meteor.user().userType),
      Meteor.subscribe('mcgParameters')
      ];
  }
});

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
Router.onBeforeAction('dataNotFound', {only: 'classesPage'});
Router.onBeforeAction(requireLogin, {only: 'classesPage'});
