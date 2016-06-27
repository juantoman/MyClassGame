alumnes = new Mongo.Collection('alumnes');

Meteor.methods({
  alumneInsert: function(alumneAttributes) {
    check(Meteor.userId(), String);
    check(alumneAttributes, {
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
    });
    var alumneId = alumnes.insert(alumne);
    return {
      _id: alumneId
    };
  }
});
