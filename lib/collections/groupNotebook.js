notebook = new Mongo.Collection('notebook');

Meteor.methods({
  notebookInsert: function(notebookInput) {
    var notebookId = notebook.insert(notebookInput);
  },
  notebookValidation: function(notebookId) {
    var notebookId = notebook.update({ _id: notebookId },{$set:{validated:true}});
  }
});
