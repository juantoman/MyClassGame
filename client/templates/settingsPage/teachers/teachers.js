Template.teachersTemplate.helpers({
  teachersWaiting: function() {
    return classes.findOne({'_id': Session.get('classId')}).teachersWaiting;
  },
  teachers: function() {
    return Meteor.users.find({'classesTeacher': Session.get('classId')})
    //return classes.findOne({'_id': Session.get('classId')}).teachers;
  },
  teacherOwner: function(teacherId) {
    owner=classes.findOne({'_id': Session.get('classId')}).teacherId;
    if ( teacherId == owner) {
      return true;
    } else {
      return false;
    }
  },
  googleOAuth: function(teacherId) {
    if ( Meteor.users.find( { '_id': this._id, 'services.google.email' : { $exists: true } } ).count() > 0 ) {
      return true;
    } else {
      return false;
    }
  },
  email: function(teacherId) {
    try {
      emailUser=Meteor.users.findOne({_id: teacherId}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: teacherId}).services.google.email;
    }
    return emailUser;
  }
});

Template.teachersTemplate.events({
  'submit form#newTeachers': function(event) {
    event.preventDefault();
    teacherEmail=$(event.target).find('[name=teacherEmail]').val();
    if ( Meteor.users.find( { 'emails.address' : teacherEmail } ).count() > 0 ) {
      teacherId=Meteor.users.findOne({'emails.address':teacherEmail})._id;
      if ( Meteor.users.find( { '_id' : teacherId, 'classesTeacher' : Session.get('classId') } ).count() == 0 ) {
        Meteor.call('teacherAccepted',Session.get("classId"),teacherId);
        swal({
          title: TAPi18n.__('teacherAccepted'),
          type: 'success'
        })
      } else {
        swal({
          title: TAPi18n.__('teacherInClassroom'),
          type: 'warning'
        })
      }
    } else {
      swal({
        title: TAPi18n.__('teacherNotFound'),
        type: 'warning'
      })
    }
    if ( Meteor.users.find( { 'services.google.email' : teacherEmail } ).count() > 0 ) {
      teacherId=Meteor.users.findOne({'services.google.email':teacherEmail})._id;
      if ( Meteor.users.find( { '_id' : teacherId, 'classesTeacher' : Session.get('classId') } ).count() == 0 ) {
        Meteor.call('teacherAccepted',Session.get("classId"),teacherId);
        swal({
          title: TAPi18n.__('teacherAccepted'),
          type: 'success'
        })
      } else {
        swal({
          title: TAPi18n.__('teacherInClassroom'),
          type: 'warning'
        })
      }
    } else {
      swal({
        title: TAPi18n.__('teacherNotFound'),
        type: 'warning'
      })
    }
    //Meteor.call('addTeacherInClass',Session.get("classId"),teacherId);
  },
  'click .acceptTeacher': function(event) {
    event.preventDefault();
    Meteor.call('teacherAccepted',Session.get("classId"),this.teacherId);
    //Meteor.call('addTeacherInClass',Session.get("classId"),this.teacherId);
    Meteor.call('delTeacherWaiting',Session.get("classId"),this.teacherId);
  },
  'click .removeTeacher': function(event) {
    event.preventDefault();
    n=Meteor.users.find({'classesTeacher': Session.get('classId')}).count();
    if (n>1) {
      swal({
        title: TAPi18n.__('delete') + " " + TAPi18n.__('teacher'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Meteor.call('teacherRemoved',Session.get("classId"),this._id);
          swal({
            title: TAPi18n.__('teacher') + " " + TAPi18n.__('deleted'),
            type: 'success'
          })
        }
      })
    } else {
      swal({
        title: TAPi18n.__('noteacher'),
        type: 'warning'
      })
    }
  }
});
