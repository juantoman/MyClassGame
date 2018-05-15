Template.challenges.helpers({
  challenge: function() {
    return challenges.find({classId: Session.get('classId')});
  }
});

Template.challenges.events({
  'submit form': function(event) {
    event.preventDefault();
    var chal = {
      classId: Session.get('classId'),
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
      createdOn: new Date()
    };
    Meteor.call('chalInsert', chal);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="chalName")
      {
        Meteor.call('chalUpdateName', event.target.name, event.currentTarget.value);
      } else {
        Meteor.call('chalUpdateDesc', event.target.name, event.currentTarget.value);
      }
    } else {
      Meteor.call('chalDelete',event.target.name);
    }
  }
});
