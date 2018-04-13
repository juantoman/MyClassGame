Template.parametersList.helpers({
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.parametersList.events({
  'change #levelXP': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('levelXPUpdate', Session.get('classId'), event.currentTarget.value);
    }
  },
  'change #studentImg': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('studentImgUpdate', Session.get('classId'), event.currentTarget.value);
    }
  },
  'change #groupImg': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('groupImgUpdate', Session.get('classId'), event.currentTarget.value);
    }
  }
});
