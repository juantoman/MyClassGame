behaviours = new Mongo.Collection('behaviours');

Meteor.methods({
  behaviourInsert: function(behaviour) {
    /*check(Meteor.userId(), String);
    check(classAttributes, {
      nom: String,
      url: String
    });
    var postWithSameLink = alumnes.findOne({url: alumneAttributes.url});
    if (postWithSameLink) {
      return {
        alumneExists: true,
          id: postWithSameLink._id
        }
    }
    var user = Meteor.user();
    var alumne = _.extend(alumneAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });*/
    //console.log(classe.className);
    var behaviourId = behaviours.insert(behaviour);
    /*return {
      _id: classId
    };*/
  },
  behaviourUpdate: function(behaviourId,behaviour) {
    var Id = behaviours.update({ _id: behaviourId }, { $set: behaviour });
  },
  behaviourDelete: function(behaviourId) {
    var Id = behaviours.remove({ _id: behaviourId });
  },
  behaviourUpdateDesc: function(behaviourId,behaviourDesc) {
    var Id = behaviours.update({ _id: behaviourId }, { $set: { behaviourDescription: behaviourDesc } });
  },
  behaviourUpdatePoints: function(behaviourId,behaviourPoints) {
    var Id = behaviours.update({ _id: behaviourId }, { $set: { points: behaviourPoints } });
  }
});
