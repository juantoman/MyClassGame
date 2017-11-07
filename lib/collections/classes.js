classes = new Mongo.Collection('classes');

Meteor.methods({
  classInsert: function(classe) {
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
    var classId = classes.insert(classe);
    /*return {
      _id: classId
    };*/
  },
  classDelete: function(classId) {
    var Id = classes.remove({ _id: classId });
  },
  classUpdate: function(classId,className) {
    var Id = classes.update({ _id: classId }, { $set: {className: className} });
  }
});
