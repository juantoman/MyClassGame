notebookWork = new Mongo.Collection('notebookWork');

Meteor.methods({
  notebookWorkInsert: function(notebookWorkInput) {
    var notebookId = notebookWork.insert(notebookWorkInput);
  }
});
