prizes = new Mongo.Collection('prizes');

Meteor.methods({
  prizeInsert: function(prize) {
    var prizeId = prizes.insert(prize);
  },
  prizeDelete: function(prizeId) {
    var Id = prizes.remove({ _id: prizeId });
  },
  prizeUpdateDesc: function(prizeId,prizeDesc) {
    var Id = prizes.update({ _id: prizeId }, { $set: { prizeDescription: prizeDesc } });
  },
  prizeUpdatePoints: function(prizeId,prizePoints) {
    var Id = prizes.update({ _id: prizeId }, { $set: { points: prizePoints } });
  }
});
