Template.parametersList.helpers({
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.parametersList.events({
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
  'change input': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('levelXPUpdate', Session.get('classId'), event.currentTarget.value);
    }
  }
});
