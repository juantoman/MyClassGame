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
  cardUpdate: function(cardId,field,cardDesc) {
    var cardField = {};
    cardField[field]=cardDesc;
    var Id = cards.update({ _id: cardId }, { $set: cardField });
  },
  imageCardUpdate: function(cardId,imageId) {
    var Id = cards.update({ _id: cardId }, { $set: {cardImage: imageId } });
  }
});
