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
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "classes": 1}});
});
Meteor.publish('badges', function() {
  return badges.find();
});
Meteor.publish('store', function() {
  return store.find();
});
Meteor.publish('convictions', function() {
  return convictions.find();
});
Meteor.publish('quotes', function() {
  return quotes.find();
});
Meteor.publish('levels', function() {
  return levels.find();
});
Meteor.publish('challenges', function() {
  return challenges.find();
});