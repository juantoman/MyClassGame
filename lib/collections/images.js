images = new Mongo.Collection('images');

Meteor.methods({
  imageInsert: function(image) {
    return images.insert(image);
  },
  imageDelete: function(imageId) {
    var Id = images.remove({ _id: imageId });
  }
});
