Template.header.onRendered(function() {
   /*
   accountsUIBootstrap3.setLanguage("es");
   TAPi18n.setLanguage("es");
   */
});

Template.header.helpers({
 className: function() {
  return Session.get('className');//classes.findOne({ _id: Session.get('classId') } ).className;
 },
 student: function() {
  if (Session.get('studentSelected')) {
   return students.findOne({ _id: Session.get('studentId') } ).alias;
  } else {
   return "";
  }
 },
 userType: function() {
  if (Session.get('userType')=="teacher") {
   return "PROFESOR";
  }
  if (Session.get('userType')=="student") {
    return "ESTUDIANTE";
  }
  if (Session.get('userType')=="parent") {
    return "PADRE/MADRE";
  }
 },
 students: function() {
    return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );
  },
  groups: function() {
    return groups.find({classId: Session.get('classId')});
  },
  userN: function() {
    try {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
    }
    catch(err) {
      emailUser=Meteor.users.findOne({_id: Meteor.userId()}).services.google.email;
    }
    n=emailUser.indexOf("@");
    return emailUser.substring(0,n);
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  onlyMyStudent: function() {
    if (Session.get('userType')=="teacher") {
      return false;
    } else {
      return classes.findOne({'_id': Session.get('classId')}).onlyMyStudent;
    }
  },
  version: function(v) {
    if (mcgParameters.findOne({"_id":1}).androidVersion == v) {
     return true;
    } else {
     return false;
    };
  },
  gamiright: function() {
    return Session.get('gamiright');
  }
});

Template.header.events({
  'change .tap-i18n-dropdown': function(event) {
    accountsUIBootstrap3.setLanguage(TAPi18n.getLanguage());
  },
  'click .clases': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
  },
  'click .clase': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    Router.go('studentsMainPage',{_id:Session.get('classId')});
  },
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',this._id);
    Session.set('studentSelected', true);
    Session.setPersistent('sogBtn', "students");
    Session.set('groupSelected', false);
    $(".tab-pane").removeClass("active");
    $("#studentsMain").addClass("active");
    $("#Datos").addClass("active");
    $(".nav-pills li").removeClass("active");
    $("#sM").addClass("active");
    $("#studentData").addClass("active");
    $("#collapseStudents").removeClass("in");
    $("#collapseStudents").removeClass("in");
  },
  'click .group_button': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId',this._id);
    Session.set('groupSelected', true);
    Session.setPersistent('sogBtn', "groups");
    Session.set('studentSelected', false);
    $(".tab-pane").removeClass("active");
    $(".nav-pills li").removeClass("active");
    $("#studentsMain").addClass("active");
    $("#sM").addClass("active");
    $("#collapseStudents").removeClass("in");
  }
});
