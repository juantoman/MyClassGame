Template.leftNav.helpers({
 className: function() {
   return Session.get('className');//classes.findOne({ _id: Session.get('classId') } ).className;
 },
 students: function() {
   return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );
 },
 groups: function() {
   return groups.find({classId: Session.get('classId')});
 },
 classes: function() {
   return classes.find({"teacherId": Meteor.userId()});
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
 onlyMyStudent: function() {
   if (Session.get('userType')=="teacher") {
     return false;
   } else {
     return classes.findOne({'_id': Session.get('classId')}).onlyMyStudent;
   }
 },
 teacher: function() {
   if (Session.get('userType')=="teacher") {
    return true;
   } else {
    return false;
   };
 }
})

Template.leftNav.events({
  'click .sidebar-dropdown > a': function(event) {
    event.preventDefault();
    $(".sidebar-submenu").slideUp(200);
    if ($(event.target).parent().hasClass("active")) {
      $(".sidebar-dropdown").removeClass("active");
      $(event.target).parent().removeClass("active");
    } else {
      $(".sidebar-dropdown").removeClass("active");
      $(event.target).next(".sidebar-submenu").slideDown(200);
      $(event.target).parent().addClass("active");
    }
  },
  'click #close-sidebar, mouseleave #sidebar, click #sidebar': function(event) {
    $(".page-wrapper").removeClass("toggled");
  },
  'mouseover #show-sidebar, mouseover #show-sidebar-line, click #show-sidebar, click #show-sidebar-line': function(event) {
    $(".page-wrapper").addClass("toggled");
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
    Router.go('myNav');
  },
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',this._id);
    Session.set('studentSelected', true);
    Session.setPersistent('sogBtn', "students");
    Session.set('groupSelected', false);
    $(".active").removeClass("active");
    $("#studentsMain").addClass("active");
    $("#Datos").addClass("active");
    $("#sM").addClass("active");
    $("#studentData").addClass("active");

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
  },
  'click .closeSession': function(event) {
    event.preventDefault();
    //Session.set('className', '');
    //Session.set('studentSelected', false);
    //Session.set('groupSelected', false);
    //Session.set('userType', "");
    //$("#fondo").css("background-image", "");
    //Router.go('/');
    //Session.keys = {}
    //gapi.auth2.getAuthInstance().signOut();
    Meteor.call('mcgLog', 'closeSession -> userId: ' + Meteor.userId());
    Router.go('/');
    Meteor.logout();
    //window.location.href = "/";
  }
})
