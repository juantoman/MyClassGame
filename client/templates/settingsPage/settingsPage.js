/*
Template.settingsPage.helpers({
  randomEvents: function() {
    return randomEvents.find({classId: Session.get('classId')});
  }
});
*/
Template.settingsPage.events({
  'click .allUsers': function(event) {
    Meteor.subscribe('allUsers');
  }
});
