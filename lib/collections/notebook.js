notebook = new Mongo.Collection('notebook');

Meteor.methods({
  notebookInsert: function(notebookInput) {
    var notebookId = notebook.insert(notebookInput);
    Session.set("nid",notebookId);
  },
  notebookValidation: function(notebookId) {
    var notebookId = notebook.update({ _id: notebookId },{$set:{validated:true}});
  },
  notebookProva: function() {
    var notebookId = notebook.update( { "_id" : "ubeHXBtpXajsjxqbW", "works.studentId" : "CxJwSbRSG3FDQMWDo" } , { $set: { 'works.$.work' : "29" } } );
  }
});
