Template.teachersTemplate.helpers({
  teachers: function() {
    return classes.findOne({'_id': Session.get('classId')}).teachersWaiting;
  },
  email: function() {
    try {
    emailUser=Meteor.users.findOne({_id: this.teacherId}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: this.teacherId}).services.google.email;
    }
    return emailUser;
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
  },
  'click .acceptTeacher': function(event) {
    event.preventDefault();
    Meteor.call('teacherAccepted',Session.get("classId"),this.teacherId);
    Meteor.call('delTeacherWaiting',Session.get("classId"),this.teacherId);
  }
});

