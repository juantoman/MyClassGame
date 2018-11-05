/*Template.register.onRendered(function () {
  //alert(Meteor.users.findOne(Meteor.user()).userType);
  Session.set('userType', Meteor.users.findOne(Meteor.user()).userType);
  Session.set('className',"");
  if (Meteor.users.findOne(Meteor.user()).userType=="teacher")
  {
    //Session.set('userType', "teacher");
    //alert(Session.get('userType'));
    Router.go('classesPage');
  }
  if (Meteor.users.findOne(Meteor.user()).userType=="student")
  {
    //Session.set('userType', "student");
    Router.go('classesPage');
  }
});*/

Template.register.helpers({
  'userType': function() {
    return Meteor.users.findOne(Meteor.user()).userType; 
  }
});

Template.register.events({
  'click .btn-teacher': function(event) {
    event.preventDefault();
    Session.setPersistent('userType', "teacher");
    Meteor.call('userTypeInsert', "teacher");
    //Meteor.users.update(Meteor.userId(), {$set: {userType: "teacher"}});
    Router.go('classesPage');
  },
  'click .btn-student': function(event) {
    event.preventDefault();
    Session.setPersistent('userType', "student");
    Meteor.call('userTypeInsert', "student");
    //Meteor.users.update(Meteor.userId(), {$set: {userType: "student"}});
    Router.go('classesPage');
  },
  'click .btn-parent': function(event) {
    event.preventDefault();
    Session.setPersistent('userType', "parent");
    Meteor.call('userTypeInsert', "parent");
    //Meteor.users.update(Meteor.userId(), {$set: {userType: "student"}});
    Router.go('classesPage');
  }
});