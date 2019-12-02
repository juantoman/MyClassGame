chatClass = new Mongo.Collection('chatClass');

Meteor.methods({
  messageInsert: function(message) {
    var id = chatClass.insert(message);
  },
  messageRemove: function(message) {
    var id = chatClass.remove({'_id':message});
  }
});
