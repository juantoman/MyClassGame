challenges = new Mongo.Collection('challenges');

Meteor.methods({
  chalInsert: function(chal) {
    var Id = challenges.insert(chal);
  },
  chalDelete: function(chalId) {
    var Id = challenges.remove({ _id: chalId });
  },
  chalUpdateName: function(chalId,chalName) {
    var Id = challenges.update({ _id: chalId }, { $set: { chalName: chalName } });
  },
  chalUpdateDesc: function(chalId,chalDesc) {
    var Id = challenges.update({ _id: chalId }, { $set: { chalDesc: chalDesc } });
  },
  nbDepChange: function(chalId,nbd) {
    var Id = challenges.update({ _id: chalId }, { $set: { notebookDependence: nbd } });
  }
});
