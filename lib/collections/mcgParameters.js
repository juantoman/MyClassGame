mcgParameters = new Mongo.Collection('mcgParameters');

Meteor.methods({
  paramsInsert: function(p) {
    var Id = mcgParameters.insert(p);
  },
  typePush: function(c) {
    var Id = mcgParameters.findOne()._id;
    var p = mcgParameters.update({_id:Id},{$push:{typeClasses:c}});
  },
  typePull: function(c) {
    var Id = mcgParameters.findOne()._id;
    var Id =  mcgParameters.update({_id:Id}, { $pull: {typeClasses: c}} );
  }
});
