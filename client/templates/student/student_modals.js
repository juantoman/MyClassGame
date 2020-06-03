Template.studentModals.events({
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var student = {
      classId: Session.get('classId'),
      studentName: $(event.target).find('[name=student-name]').val(),
      email: $(event.target).find('[name=email]').val(),
      createdOn: new Date()
    };
    //Meteor.call('studentInsert', student);
  }
});

Template.deleteStudent.events({
  'submit form': function(event) {
    event.preventDefault();
    Meteor.call('studentDelete', Session.get('studentId'));
    Modal.hide('deleteStudent');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
  }
});

Template.resetStudent.events({
  'submit form': function(event) {
    event.preventDefault();
    Meteor.call('studentReset', Session.get('studentId'));
    Modal.hide('resetStudent');
  }
});
