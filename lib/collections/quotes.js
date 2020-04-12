quotes = new Mongo.Collection('quotes');

Meteor.methods({
  quoteInsert: function(quote) {
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
    var quoteId = quotes.insert(quote);
    /*return {
      _id: classId
    };*/
  },
  quoteDelete: function(quoteId) {
    var Id = quotes.remove({ _id: quoteId });
  },
  quoteUpdate: function(quoteId,quote) {
    var Id = quotes.update({ _id: quoteId }, { $set: quote });
  },
  noRandomQuote: function(rId) {
    var Id = quotes.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomQuotes: function(classId) {
    var Id = quotes.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  }
});
