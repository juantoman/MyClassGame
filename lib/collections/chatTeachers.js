chatTeachers = new Mongo.Collection('chatTeachers');

Meteor.methods({
  messageTeacherInsert: function(message) {
    var id = chatTeachers.insert(message);
  }
});
