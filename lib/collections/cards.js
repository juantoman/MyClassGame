cards = new Mongo.Collection('cards');

Meteor.methods({
  cardInsert: function(card) {
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
    var Id = cards.insert(card);
    /*return {
      _id: classId
    };*/
  },
  cardDelete: function(cardId) {
    var Id = cards.remove({ _id: cardId });
  },
  cardUpdate: function(cardId,card) {
    var Id = cards.update({ _id: cardId }, { $set: card });
  },
  imageCardUpdate: function(cardId,imageId) {
    var Id = cards.update({ _id: cardId }, { $set: {cardImage: imageId } });
  },
  noRandomCard: function(rId) {
    var Id = cards.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomCards: function(classId) {
    var Id = cards.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  },
  deleteAllCards: function(classId) {
    var Id = cards.remove({ 'classId': classId }, { multi: true});
  },
});
