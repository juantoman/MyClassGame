Template.randomEventsList.helpers({
  randomEvents: function() {
    return randomEvents.find({classId: Session.get('classId')});
  }
});

Template.randomEventsList.events({
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var randomEvent = {
      classId: Session.get('classId'),
      eventDescription: $(event.target).find('[name=eventDescription]').val(),
      createdOn: new Date()
    };
    Meteor.call('randomEventInsert', randomEvent);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('randomEventUpdate', event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('randomEventDelete',event.target.id);
    }
  }
});