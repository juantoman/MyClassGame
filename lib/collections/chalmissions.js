chalMissions = new Mongo.Collection('chalMissions');

Meteor.methods({
  chalMissionInsert: function(chal) {
    var Id = chalMissions.insert(chal);
  },
  chalMissionDelete: function(chalId, mid, o) {
    var Id = chalMissions.remove({ _id: chalId });
    var Id = chalMissions.update({ missionId: mid, order: { $gt: o } }, { $inc: { order: -1 } }, { multi: true} );
  },
  chalMissionUpdateData: function(chalId,chalDesc,chalXP) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { chalMissionDesc: chalDesc, chalMissionXP: chalXP } });
  },
  chalMissionUpdateDesc: function(chalId,chalName) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { chalName: chalName } });
  },
  chalMissionUpdateXP: function(chalId,chalDesc) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { chalDesc: chalDesc } });
  },
  chalMissionOrder: function(chalId,order) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { order: order } });
  },
  chalUpdateR1: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r1: r } });
  },
  chalUpdateR2: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r2: r } });
  },
  chalUpdateR3: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r3: r } });
  },
  chalUpdateR4: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r4: r } });
  },
  chalUpdateR5: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r5: r } });
  },
  chalUpdateR6: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { r6: r } });
  },
  chalUpdateDescTask: function(chalId, descTask) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { descTask: descTask } });
  },
  chalUpdateDrive: function(chalId,r) {
    var Id = chalMissions.update({ _id: chalId }, { $set: { drive: r } });
  }
});
