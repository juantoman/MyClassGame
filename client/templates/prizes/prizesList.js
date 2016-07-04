Template.prizesList.helpers({
  prizesList: function() {
    return prizes.find({classId: Session.get('classId')});
  }
});

Template.prizesList.events({
  'submit form': function(event) {
    event.preventDefault();
    if (Session.get('behaviourButton') == "btn-positive")
    {
      positiveBehaviour=true;
    } else {
      positiveBehaviour=false;
    }
    var behaviour = {
      classId: Session.get('classId'),
      behaviourDescription: $(event.target).find('[name=behaviourDescription]').val(),
      positive: positiveBehaviour,
      points: $(event.target).find('[name=behaviourPoints]').val(),
      createdOn: new Date()
    };
    Meteor.call('behaviourInsert', behaviour);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="inputDesc")
      {
        Meteor.call('behaviourUpdateDesc', event.target.name, event.currentTarget.value);
      } else {
        Meteor.call('behaviourUpdatePoints', event.target.name, event.currentTarget.value);
      }
    } else {
      Meteor.call('behaviourDelete',event.target.name);
    }
  },
  'click button': function(event) {
    //event.preventDefault();
    Session.setPersistent('behaviourButton', event.currentTarget.id);
  }
});
