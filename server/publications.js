Meteor.publish('classes', function() {
  return classes.find();
});
Meteor.publish('students', function() {
  return students.find();
});
Meteor.publish('groups', function() {
  return groups.find();
});
Meteor.publish('randomEvents', function() {
  return randomEvents.find();
});
Meteor.publish('behaviours', function() {
  return behaviours.find();
});
Meteor.publish('behavioursLog', function() {
  return behavioursLog.find();
});
Meteor.publish('allUsers', function() {
  return Meteor.users.find({}, {fields: {"services.google": 1}});
});
Meteor.publish('badges', function() {
  return badges.find();
});
