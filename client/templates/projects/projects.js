Template.projects.helpers({
  projects: function() {
    return projects.find({classId: Session.get('classId')});
  }
});

Template.projects.events({
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var project = {
      classId: Session.get('classId'),
      projectName: $(event.target).find('[name=projectName]').val(),
      projectDescription: $(event.target).find('[name=projectDescription]').val(),
      createdOn: new Date()
    };
    Meteor.call('projectInsert', project);
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
