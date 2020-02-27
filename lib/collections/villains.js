villains = new Mongo.Collection('villains');

Meteor.methods({
  villainInsert: function(villain) {
    var Id = villains.insert(villain);
  },
  villainDelete: function(villainId) {
    var Id = villains.remove({ _id: villainId });
  },
  villainNameUpdate: function(villainId,villainName) {
    var Id = villains.update({ _id: villainId }, { $set: { villainName: villainName} });
  },
  villainHPUpdate: function(villainId,HP) {
    var Id = villains.update({ _id: villainId }, { $set: { HP: HP} });
  },
  villainImageUpdate: function(itemId,imageId) {
    var Id = villains.update({ _id: itemId }, { $set: {villainImage: imageId } });
  },
  allRandomVillains: function(classId) {
    var Id = villains.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  }
});
