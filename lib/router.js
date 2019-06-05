Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('mcgParameters')
      ];
  }
});

//Router.route('/', {name: 'llistaAlumnes'});
Router.route('/', {name: 'index'});
Router.route('/classesPage', {name: 'classesPage',
  waitOn: function() {
    return [
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('classes'),
      Meteor.subscribe('images'),
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
Router.route('/myNav/:_id', {name: 'myNav',
  waitOn: function() {
    return [
      Meteor.subscribe('allUsers'),
      Meteor.subscribe('classes',Session.get("classId")),
      Meteor.subscribe('mcgParameters'),
      Meteor.subscribe('students',Meteor.user().userType,this.params._id),
      Meteor.subscribe('badges',Meteor.user().userType,this.params._id),
      Meteor.subscribe('groups',Meteor.user().userType,this.params._id),
      Meteor.subscribe('randomEvents',Meteor.user().userType,this.params._id),
      Meteor.subscribe('behaviours',Meteor.user().userType,this.params._id),
      Meteor.subscribe('behavioursLog',Meteor.user().userType,this.params._id),
      Meteor.subscribe('store',Meteor.user().userType,this.params._id),
      Meteor.subscribe('convictions',Meteor.user().userType,this.params._id),
      Meteor.subscribe('quotes',Meteor.user().userType,this.params._id),
      Meteor.subscribe('levels',Meteor.user().userType,this.params._id),
      Meteor.subscribe('challenges',Meteor.user().userType,this.params._id),
      Meteor.subscribe('chalMissions',Meteor.user().userType,this.params._id),
      Meteor.subscribe('chalPoints',Meteor.user().userType,this.params._id),
      Meteor.subscribe('challengesXP',Meteor.user().userType,this.params._id),
      Meteor.subscribe('diary',Meteor.user().userType,this.params._id),
      Meteor.subscribe('notebook',Meteor.user().userType,this.params._id),
      Meteor.subscribe('notebookWork',Meteor.user().userType,this.params._id),
      Meteor.subscribe('images'),
      Meteor.subscribe('cards',Meteor.user().userType,this.params._id),
      Meteor.subscribe('chromes',Meteor.user().userType,this.params._id),
      Meteor.subscribe('chatClass',Meteor.user().userType,this.params._id),
      Meteor.subscribe('chatTeachers'),
      Meteor.subscribe('notifications',Meteor.user().userType,this.params._id)
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
