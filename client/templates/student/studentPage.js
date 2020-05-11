Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  }
});
