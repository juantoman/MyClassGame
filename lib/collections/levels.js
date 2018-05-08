levels = new Mongo.Collection('levels');

Meteor.methods({
  levelInsert: function(level) {
    var Id = levels.insert(level);
  },
  levelDelete: function(levelId) {
    var Id = levels.remove({ _id: levelId });
  },
  levelUpdateDesc: function(levelId,levelDesc) {
    var Id = levels.update({ _id: levelId }, { $set: { levelDescription: levelDesc } });
  },
  levelUpdate: function(levelId,level) {
    var Id = levels.update({ _id: levelId }, { $set: { level: level } });
  }
});
