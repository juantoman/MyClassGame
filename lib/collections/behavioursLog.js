behavioursLog = new Mongo.Collection('behavioursLog');

Meteor.methods({
  behaviourLogInsert: function(behaviourLog) {
    var behaviourLogId = behavioursLog.insert(behaviourLog);
  },
  behaviourLogDelete: function(behaviourLogId) {
    var Id = behavioursLog.remove({ _id: behaviourLogId });
  },
  behaviourLogUpdateDesc: function(behaviourLogId,behaviourLogDesc) {
    var Id = behavioursLog.update({ _id: behaviourLogId }, { $set: { behaviourLogDescription: behaviourLogDesc } });
  },
  behaviourLogUpdatePoints: function(behaviourLogId,behaviourLogPoints) {
    var Id = behavioursLog.update({ _id: behaviourLogId }, { $set: { points: behaviourLogPoints } });
  }
});
