challengesXP = new Mongo.Collection('challengesXP');

Meteor.methods({
  chalInsertXP: function(chal) {
    //console.log(chal);
    var Id = challengesXP.insert(chal);
  },
  chalUpdateXP: function(studentId, chalId, per, chalXP) {
    var Id = challengesXP.update( { studentId: studentId, chalId: chalId }, { $set: { per: per, chalXP: chalXP } } );
  },
  chalDeleteXP: function(studentId, chalId) {
    var Id = challengesXP.remove({ studentId: studentId, chalId: chalId });
  }
});
