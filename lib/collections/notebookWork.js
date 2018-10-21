notebookWork = new Mongo.Collection('notebookWork');

Meteor.methods({
  notebookWorkInsert: function(notebookWorkInput) {
    var notebookId = notebookWork.insert(notebookWorkInput);
  },
  validatedWork: function(notebookId,validated) {
    var notebookId = notebookWork.update({ notebookId: notebookId },{$set:{validated:validated}}, {multi: true});
  }
});
