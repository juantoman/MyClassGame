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
  email: function() {
    try {
      emailUser=Meteor.users.findOne({_id: this.teacherId}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: this.teacherId}).services.google.email;
    }
    return emailUser;
  },
  teacherEmail: function() {
    try {
      emailUser=Meteor.users.findOne({_id: this._id}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: this._id}).services.google.email;
    }
    return emailUser;
  }
});

Template.teachersTemplate.events({
  'submit form#newTeachers': function(event) {
    event.preventDefault();
    teacherEmail=$(event.target).find('[name=teacherEmail]').val();
    try {
      teacherId=Meteor.users.findOne({'emails.address':teacherEmail})._id;
    }
    catch(err) {
      teacherId=Meteor.users.findOne({'services.google.email':teacherEmail})._id;
    }
    //Meteor.call('addTeacherInClass',Session.get("classId"),teacherId);
    Meteor.call('teacherAccepted',Session.get("classId"),teacherId);
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
      Meteor.call('teacherRemoved',Session.get("classId"),this._id);
    } else {
      alert("No puede quedarse sin profes")
    }
  }
});
