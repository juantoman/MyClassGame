convictions = new Mongo.Collection('convictions');

Meteor.methods({
  convictionInsert: function(conviction) {
    var Id = convictions.insert(conviction);
  },
  convictionDelete: function(convictionId) {
    var Id = convictions.remove({ _id: convictionId });
  },
  convictionUpdate: function(convictionId,convictionDesc) {
    var Id = convictions.update({ _id: convictionId }, { $set: { convictionDescription: convictionDesc } });
  }
});
