images = new Mongo.Collection('images');

Meteor.methods({
  imageInsert: function(image) {
    var Id = images.insert(image);
  },
  imageDelete: function(imageId) {
    var Id = images.remove({ _id: imageId });
  }
});
