Template.studentPage.helpers({
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  challenge: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return challenges.find({classId: Session.get('classId')});
  },
  badges: function() {
    //return students.findOne({ _id: Session.get('studentId') } ).challenges;
    return students.findOne({_id: Session.get('studentId')}).badges;
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
  },
  inputDisabled: function() {
    if (Session.get('userType')=="teacher") {
     return "";
    } else {
     return "disabled";
    };
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  moc: function(type) {
    if (type == "Reto")
    {
      return "has-error";
    } else {
      return "has-success"
    }
  },
  badge: function(){
    return badges.findOne({_id: this.badgeId});
  },
  statistics: function() {
    return behavioursLog.find({classId: Session.get('classId'),student:Session.get('studentId')});
    //return behavioursLog.find({classId: Session.get('classId')},{sort: {student: -1}});
  },
  behaviour: function(){
    return behaviours.findOne({_id: this.behavior});
  },
  createdOnFormatted: function (date) {
    return moment(date).format('LLLL');
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
  },
  'submit form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    studentId=Session.get('studentId');
    studentName=$(event.target).find('[name=sName]').val();
    level=$(event.target).find('[name=sLevel]').val();
    alias=$(event.target).find('[name=sAlias]').val();
    avatar=$(event.target).find('[name=sAvatar]').val();
    email=$(event.target).find('[name=sEmail]').val();
    Meteor.call('studentModify',studentId,studentName,level,alias,avatar,email);
  },
  'click .btn-default': function() {
    Session.set('studentSelected', false);
  }
});
