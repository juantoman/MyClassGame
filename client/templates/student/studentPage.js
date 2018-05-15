Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  challenge: function() {
    return students.findOne({ _id: Session.get('studentId') } ).challenges;
    //return challenges.find({classId: Session.get('classId')});
  },
  chalName: function(chalId) {
    return challenges.findOne({ _id: chalId } ).chalName;
    //return challenges.find({classId: Session.get('classId')});
  },
  image: function(avatar) {
    if ( avatar=="" || !avatar ) {
      if ( classes.findOne({_id: Session.get('classId')}).studentImg ) {
        return classes.findOne({_id: Session.get('classId')}).studentImg;
      } else {
        return "/images/user_128.png";
      }
    } else  {
      return avatar;
    }
  }
});

Template.studentPage.events({
  'change .cp': function(event) {
    event.preventDefault();
    var chalCP = {
      chalId: event.target.id,
      chalCP: $(event.target).val(),
      createdOn: new Date()
    };
    studentId=Session.get('studentId');
    Meteor.call('chalChange', studentId, chalCP);
  }
});
