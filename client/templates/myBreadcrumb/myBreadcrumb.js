/*Template.register.onRendered(function () {
  //alert(Meteor.users.findOne(Meteor.user()).userType);
  Session.set('userType', Meteor.users.findOne(Meteor.user()).userType);
});*/
Template.myBreadcrumb.helpers({
 className: function() {
  return Session.get('className');
 },
 studentName: function() {
  if (Session.get('studentSelected')) {
   return students.findOne({ _id: Session.get('studentId') } ).studentName;
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
    //Router.go('/');
  },
  'click .clase': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    //Router.go('/');
  }
});