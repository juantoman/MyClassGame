Template.chatTeachers.helpers({
  teacherMessages: function() {
    return chatTeachers.find();
  },
  avatar: function(id) {
    try {
      emailUser=Meteor.users.findOne({_id: id}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: id}).services.google.email;
    }
    return students.findOne({email: emailUser}).avatar;
  },
  even: function (value) {
    return (value % 2) === 1;
  }
});

Template.chatTeachers.events({
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var message = {
      classId: Session.get('classId'),
      userId: Meteor.userId(),
      message: $(event.target).find('[name=message]').val(),
      createdOn: new Date()
    };
    Meteor.call('messageTeacherInsert', message);
    $(event.target).find('[name=message]').val("");
  }
});
