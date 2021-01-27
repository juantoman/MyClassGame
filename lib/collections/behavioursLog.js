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
  },
  behaviourLogUpdate: function(behaviourLogId,behaviourLog) {
    var Id = behavioursLog.update({ _id: behaviourLogId }, { $set: behaviourLog });
  },
  deleteLogTask: function(student, task) {
    var Id = behavioursLog.remove( {'student': student, 'behavior': task});
  },
});
