history = new Mongo.Collection('history');

Meteor.methods({
  historyInsert: function(historyItem) {
    var historyId = history.insert(historyItem);
  },
  historyDelete: function(historyId) {
    var historyId = history.remove({ _id: historyId });
  }
});
