/*Template.register.onRendered(function () {
  //alert(Meteor.users.findOne(Meteor.user()).userType);
  Session.set('userType', Meteor.users.findOne(Meteor.user()).userType);
});*/

Accounts.onLogout(function(user) {
  Router.go('/');
});

Template.myBreadcrumb.helpers({
 className: function() {
  return Session.get('className');//classes.findOne({ _id: Session.get('classId') } ).className;
 },
 studentName: function() {
  if (Session.get('studentSelected')) {
   return students.findOne({ _id: Session.get('studentId') } ).alias;
  } else {
   return "";
  }
 },
 userType: function() {
  if (Session.get('userType')=="teacher") {
   return "PROFESOR";
  }
  if (Session.get('userType')=="student") {
    return "ESTUDIANTE";
  }
  if (Session.get('userType')=="parent") {
    return "PADRE/MADRE";
  }
 }
});
Template.myBreadcrumb.events({
  'click .clases': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
  },
  'click .clase': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    Router.go('myNav');
  },
  'click .closeSession': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    //Session.set('userType', "");
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
    Session.keys = {}
    //gapi.auth2.getAuthInstance().signOut();
    Meteor.logout();
  }
});