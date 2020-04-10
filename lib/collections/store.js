store = new Mongo.Collection('store');

Meteor.methods({
  itemInsert: function(item) {
    var Id = store.insert(item);
  },
  itemDelete: function(itemId) {
    var Id = store.remove({ _id: itemId });
  },
  itemUpdate: function(itemId,item) {
    var Id = store.update({ _id: itemId }, { $set: item });
  },
  itemUpdateName: function(itemId,itemName) {
    var Id = store.update({ _id: itemId }, { $set: { itemName: itemName } });
  },
  itemUpdateDesc: function(itemId,itemDesc) {
    var Id = store.update({ _id: itemId }, { $set: { itemDescription: itemDesc } });
  },
  itemUpdatePrice: function(itemId,itemPrice) {
    var Id = store.update({ _id: itemId }, { $set: { price: itemPrice } });
  },
  imageItemUpdate: function(itemId,imageId) {
    var Id = store.update({ _id: itemId }, { $set: {itemImage: imageId } });
  }
});
