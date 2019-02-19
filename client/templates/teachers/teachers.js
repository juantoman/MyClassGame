Template.teachersTemplate.helpers({
  teachers: function() {
    //return quotes.find({classId: Session.get('classId')});
  }
});

Template.teachersTemplate.events({
  'submit form': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=quoteText]').val());
    var quote = {
      classId: Session.get('classId'),
      quoteText: $(event.target).find('[name=quoteText]').val(),
      createdOn: new Date()
    };
    //Meteor.call('quoteInsert', quote);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      //Meteor.call('quoteUpdate', event.target.id, event.currentTarget.value);
    } else {
      //Meteor.call('quoteDelete',event.target.id);
    }
  }
});
