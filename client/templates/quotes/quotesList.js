Template.quotesList.helpers({
  quotes: function() {
    return quotes.find({classId: Session.get('classId')});
  }
});

Template.quotesList.events({
  'submit form.createQuoteForm': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=quoteText]').val());
    var quote = {
      classId: Session.get('classId'),
      quoteName: $(event.target).find('[name=quoteName]').val(),
      quoteText: $(event.target).find('[name=quoteDesc]').val(),
      createdOn: new Date()
    };
    Meteor.call('quoteInsert', quote);
  },
  'submit form.quoteForm': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=quoteText]').val());
    var quote = {
      quoteName: $(event.target).find('[name=quoteName]').val(),
      quoteText: $(event.target).find('[name=quoteDesc]').val(),
    };
    Meteor.call('quoteUpdate', this._id, quote);
  },
  'click .btnDeleteQuote': function(event) {
    event.preventDefault();
    Meteor.call('quoteDelete', this._id);
  }
});
