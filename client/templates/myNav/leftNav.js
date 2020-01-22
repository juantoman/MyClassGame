Template.leftNav.helpers({
 className: function() {
   return Session.get('className');//classes.findOne({ _id: Session.get('classId') } ).className;
 },
 students: function() {
   return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );
 },
 groups: function() {
   return groups.find({classId: Session.get('classId')});
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
  'click #close-sidebar': function(event) {
    $(".page-wrapper").removeClass("toggled");
  },
  'click #show-sidebar': function(event) {
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
  }
})
