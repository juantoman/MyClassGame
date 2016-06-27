behavioursLog = new Mongo.Collection('behavioursLog');

Meteor.methods({
  behaviourLogInsert: function(behaviourLog) {
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
    var behaviourLogId = behavioursLog.insert(behaviourLog);
    /*return {
      _id: classId
    };*/
  },
  behaviourLogDelete: function(behaviourLogId) {
    var Id = behavioursLog.remove({ _id: behaviourLogId });
  },
  behaviourLogUpdateDesc: function(behaviourLogId,behaviourLogDesc) {
    var Id = behavioursLog.update({ _id: behaviourLogId }, { $set: { behaviourLogDescription: behaviourLogDesc } });
  },
  behaviourLogUpdatePoints: function(behaviourLogId,behaviourLogPoints) {
    var Id = behavioursLog.update({ _id: behaviourLogId }, { $set: { points: behaviourLogPoints } });
  }
});
