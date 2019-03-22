Template.index.onRendered(function () {
  //alert(Meteor.users.findOne(Meteor.user()).userType);
  /*Session.set('userType', Meteor.users.findOne(Meteor.user()).userType);
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
  }*/
  if (Meteor.user().userType != "") {
    Router.go('classesPage');
  }
});

Template.index.helpers({
  'userType': function() {
    tipo=Meteor.users.findOne(Meteor.user()).userType;
    if (typeof tipo == "undefined") {
      Meteor.call('userTypeInsert', "");
    }
    Session.setPersistent('userType', tipo);
    if ( tipo != "" ) {
      return true;
    } else {
      return false;
    }
  }
});
