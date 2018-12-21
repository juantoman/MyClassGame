chalMissions = new Mongo.Collection('chalMissions');

Meteor.methods({
  chalMissionInsert: function(chal) {
    var Id = chalMissions.insert(chal);
  },
  chalMissionDelete: function(chalId, mid, o) {
    var Id = chalMissions.remove({ _id: chalId });
    var Id = chalMissions.update({ missionId: mid, order: { $gt: o } }, { $inc: { order: -1 } }, { multi: true} );
  },
  chalMissionUpdateDesc: function(chalId,chalName) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { chalName: chalName } });
  },
  chalMissionUpdateXP: function(chalId,chalDesc) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { chalDesc: chalDesc } });
  },
  chalMissionOrder: function(chalId,order) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { order: order } });
  }
});
