/*Template.register.onRendered(function () {
  //alert(Meteor.users.findOne(Meteor.user()).userType);
  Session.set('userType', Meteor.users.findOne(Meteor.user()).userType);
});*/
Template.myBreadcrumb.helpers({
 className: function() {
  return Session.get('className');
 },
 userType: function() {
  if (Session.get('userType')=="teacher") {
   return "PROFESOR";
  } else {
   return "ESTUDIANTE";
  };
 }
});
Template.myBreadcrumb.events({
  'click a': function(event) {
    event.preventDefault();
    Session.set('className', '');
    //Router.go('/');
  }
});