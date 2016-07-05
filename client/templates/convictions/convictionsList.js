Template.convictionsList.helpers({
  convictions: function() {
    return convictions.find({classId: Session.get('classId')});
  }
});

Template.convictionsList.events({
  'submit form': function(event) {
    event.preventDefault();
    var conviction = {
      classId: Session.get('classId'),
      convictionDescription: $(event.target).find('[name=convictionDesc]').val(),
      createdOn: new Date()
    };
    Meteor.call('convictionInsert', conviction);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('convictiontUpdate', event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('convictionDelete',event.target.id);
    }
  }
});
