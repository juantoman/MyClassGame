chromes = new Mongo.Collection('chromes');

Meteor.methods({
  chromeInsert: function(chrome) {
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
    var Id = chromes.insert(chrome);
    /*return {
      _id: classId
    };*/
  },
  chromeDelete: function(chromeId) {
    var Id = chromes.remove({ _id: chromeId });
  },
  chromeUpdate: function(chromeId,chrome) {
    var Id = chromes.update({ _id: chromeId }, { $set: chrome });
  },
  imageChromeUpdate: function(chromeId,imageId) {
    var Id = chromes.update({ _id: chromeId }, { $set: {chromeImage: imageId } });
  },
  noRandomChrome: function(rId) {
    var Id = chromes.update({ '_id': rId }, { $set: {'random': false } });
  },
  allRandomChromes: function(classId) {
    var Id = chromes.update({'classId': classId}, { $set: {'random': true } }, { multi: true});
  }
});
