Template.levelsTemplate.helpers({
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  },
  levelObj: function() {
    return levels.find({classId: Session.get('classId')});
  }
});

Template.levelsTemplate.events({
  'change #levelXP': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('levelXPUpdate', Session.get('classId'), event.currentTarget.value);
    }
  },
  'change #xpCheck': function(event) {
    event.preventDefault();
    Meteor.call('xpChangeLevel', Session.get('classId'), event.currentTarget.checked);
  },
  'submit form': function(event) {
    event.preventDefault();
    var level = {
      classId: Session.get('classId'),
      levelDescription: $(event.target).find('[name=levelDescription]').val(),
      level: $(event.target).find('[name=level]').val(),
      createdOn: new Date()
    };
    Meteor.call('levelInsert', level);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="inputDesc")
      {
        Meteor.call('levelUpdateDesc', event.target.name, event.currentTarget.value);
      } else {
        Meteor.call('levelUpdate', event.target.name, event.currentTarget.value);
      }
    } else {
      Meteor.call('levelDelete',event.target.name);
    }
  }
});
