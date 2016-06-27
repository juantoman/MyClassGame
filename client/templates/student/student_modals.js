Template.studentModals.events({
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var student = {
      classId: Session.get('classId'),
      studentName: $(event.target).find('[name=student-name]').val(),
      createdOn: new Date()
    };
    //Meteor.call('studentInsert', student);
  }
});
