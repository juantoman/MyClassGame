chatStudentTeacher = new Mongo.Collection('chatStudentTeacher');

Meteor.methods({
  messageSTInsert: function(message) {
    var id = chatStudentTeacher.insert(message);
  },
  messageSTRemove: function(message) {
    var id = chatStudentTeacher.remove({'_id':message});
  },
  messageRead: function(message) {
    var id = chatStudentTeacher.update({'_id':message},{$set:{'read':true}});
  }
});
