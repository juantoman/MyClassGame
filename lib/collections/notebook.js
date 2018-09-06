notebook = new Mongo.Collection('notebook');

Meteor.methods({
  notebookInsert: function(notebookInput) {
    var notebookId = notebook.insert(notebookInput);
    Session.set("nid",notebookId);
  },
  validatedChange: function(notebookId,validated) {
    var notebookId = notebook.update({ _id: notebookId },{$set:{validated:validated}});
  },
  seenChange: function(notebookId,seen) {
    var notebookId = notebook.update({ _id: notebookId },{$set:{seen:seen}});
  },
  notebookProva: function() {
    var notebookId = notebook.update( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { $set: { 'works.$.work' : "29" } } );
  }
});
