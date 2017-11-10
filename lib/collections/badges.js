badges = new Mongo.Collection('badges');

Meteor.methods({
  badgeInsert: function(badge) {
    var Id = badges.insert(badge);
  },
  badgeDelete: function(badgeId) {
    var Id = badges.remove({ _id: badgeId });
  },
  badgeUpdateDesc: function(badgeId,badgeDesc) {
    var Id = badges.update({ _id: badgeId }, { $set: { badgeDescription: badgeDesc } });
  },
  badgeUpdatePoints: function(badgeId,badgePoints) {
    var Id = badges.update({ _id: badgeId }, { $set: { points: badgePoints } });
  },
  badgeUpdateLevel: function(badgeId,badgeLevel) {
    var Id = badges.update({ _id: badgeId }, { $set: {level: badgeLevel } });
  }
});
