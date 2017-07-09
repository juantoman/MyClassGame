tasks = new Mongo.Collection('tasks');

Meteor.methods({
  taskInsert: function(task) {
  var taskId = tasks.insert(task);
  },
  taskDelete: function(taskId) {
    var Id = tasks.remove({ _id: taskId });
  },
  taskUpdateDesc: function(taskId,behaviourDesc) {
    var Id = tasks.update({ _id: taskId }, { $set: { taskDescription: taskDesc } });
  },
  taskUpdatePoints: function(taskId,behaviourPoints) {
    var Id = tasks.update({ _id: taskId }, { $set: { points: taskPoints } });
  }
});
