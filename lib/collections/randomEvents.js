randomEvents = new Mongo.Collection('randomEvents');

Meteor.methods({
  randomEventInsert: function(randomEvent) {
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
    var randomEventId = randomEvents.insert(randomEvent);
    /*return {
      _id: classId
    };*/
  },
  randomEventDelete: function(eventId) {
    var Id = randomEvents.remove({ _id: eventId });
  },
  randomEventUpdate: function(eventId,field,eventDesc) {
    var eventField = {};
    eventField[field]=eventDesc;
    var Id = randomEvents.update({ _id: eventId }, { $set: eventField });
  },
  imageEventUpdate: function(eventId,imageId) {
    var Id = randomEvents.update({ _id: eventId }, { $set: {eventImage: imageId } });
  },
  noRandomEvent: function(rId) {
    var Id = randomEvents.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomEvents: function(classId) {
    var Id = randomEvents.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  }
});
