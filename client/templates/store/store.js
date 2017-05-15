Template.store.helpers({
  store: function() {
    return store.find({classId: Session.get('classId')});
  }
});

Template.store.events({
  'submit form': function(event) {
    event.preventDefault();
    var item = {
      classId: Session.get('classId'),
      itemDescription: $(event.target).find('[name=itemDescription]').val(),
      price: $(event.target).find('[name=itemPrice]').val(),
      createdOn: new Date()
    };
    Meteor.call('itemInsert', item);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="inputDesc")
      {
        Meteor.call('itemUpdateDesc', event.target.name, event.currentTarget.value);
      } else {
        Meteor.call('itemUpdatePoints', event.target.name, event.currentTarget.value);
      }
    } else {
      Meteor.call('itemDelete',event.target.name);
    }
  }
});
