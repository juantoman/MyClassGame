Meteor.publish('classes', function() {
  //c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
  //c=Meteor.users.find({_id:Meteor.userId()});
  //return classes.find({"_id": { "$in": c }, stored: false });
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
  return Meteor.users.find({}, {fields: {"services.google": 1, "userType": 1, "classes": 1, "emails": 1}});
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
Meteor.publish('chalPoints', function() {
  return chalPoints.find();
});
Meteor.publish('diary', function() {
  return diary.find();
});
Meteor.publish('notebook', function() {
  return notebook.find();
});
Meteor.publish('notebookWork', function() {
  return notebookWork.find();
});
Meteor.publish('images', function() {
  return images.find();
});
