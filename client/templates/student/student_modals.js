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

Template.resetStudent.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  }
});

Template.resetStudent.events({
  'submit form#reset_student_form': function(event) {
    event.preventDefault();
    xp=$(event.target).find('[name=xp]').val();
    hp=$(event.target).find('[name=hp]').val();
    money=$(event.target).find('[name=money]').val();
    Meteor.call('studentReset', Session.get('studentId'),xp, money, hp);
    Modal.hide('resetStudent');
  }
});
