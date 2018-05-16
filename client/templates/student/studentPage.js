Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  challenge: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
  },
  CP: function(cId) {
    return chalPoints.findOne({'chalId':cId,'studentId':Session.get('studentId')}).chalCP;
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
    studentId=Session.get('studentId');
    chalId=event.target.id;
    chalCP=$(event.target).val();
    //alert("cambio" + studentId + " " + chalId + " " + chalCP);
    //console.log(chalPoints.findOne({ chalId: chalId, studentId: Session.get('studentId')}).chalCP);
    if ( Meteor.call('chalUpdatePoints', studentId, chalId, chalCP) )
    {
      return;
    } else {
      var chalCP = {
        studentId: studentId,
        chalId: chalId,
        chalCP: chalCP,
        createdOn: new Date()
      };
      Meteor.call('chalInsertPoints', chalCP);
    }
  }
});
