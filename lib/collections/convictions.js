convictions = new Mongo.Collection('convictions');

Meteor.methods({
  convictionInsert: function(conviction) {
    var Id = convictions.insert(conviction);
  },
  convictionDelete: function(convictionId) {
    var Id = convictions.remove({ _id: convictionId });
  },
  convictionUpdate: function(convictionId,conviction) {
    var Id = convictions.update({ _id: convictionId }, { $set: conviction });
  },
  noRandomConviction: function(rId) {
    var Id = convictions.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomConvictions: function(classId) {
    var Id = convictions.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  }
});
