chalPoints = new Mongo.Collection('chalPoints');

Meteor.methods({
  chalInsertPoints: function(chal) {
    //console.log(chal);
    var Id = chalPoints.insert(chal);
  },
  chalUpdatePoints: function(studentId, chalId, chalCP) {
    var Id = chalPoints.update( { studentId: studentId, chalId: chalId }, { $set: { chalCP: chalCP } } );
  }
});
