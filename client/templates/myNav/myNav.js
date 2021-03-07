//import swal from 'sweetalert';
Template.myNav.onRendered(function () {
  Session.set('className',classes.findOne({ _id: Session.get('classId') } ).className);
  $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
  if ( classes.findOne({_id: Session.get("classId")}).backImg != "" ) {
    $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
    $(".opacityDiv").addClass('opacityProfile');
   }
   if ( Meteor.user().userType == "teacher" ) {
     Meteor.call('quizzesUpdateUser', Session.get('classId'));
     Meteor.call('questionsUpdateUser', Session.get('classId'));
   }
});

Template.myNav.helpers({
  /*n(m) {
    var navSelected = Session.get('navItem');
    if ( m == navSelected ) {
      return "active";
    }else{
      return "";
    }
  },*/
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  aventura: function() {
    if (Session.get('userType')!="parent") {
     return true;
    } else {
     return false;
    };
  },
  students: function() {
    return students.find({ classId: Session.get('classId') }, {sort: {XP: -1,_id: 1}} );
  },
  groups: function() {
    return groups.find({classId: Session.get('classId')});
  },
  menuSuperiorVisible: function() {
    if (Session.get('userType')=="teacher") {
     return "";
    } else {
     return "oculto";
    };
  }
});
Template.myNav.events({
  'click .student_button': function(event) {
    event.preventDefault();
    Session.setPersistent('studentId',event.target.id);
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
  'click .all_button': function(event) {
    event.preventDefault();
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $(".tab-pane").removeClass("active");
    $(".nav-pills li").removeClass("active");
    $("#studentsMain").addClass("active");
    $("#sM").addClass("active");
  },
  'click .group_button': function(event) {
    event.preventDefault();
    Session.setPersistent('groupId',event.target.id);
    Session.set('groupSelected', true);
    Session.setPersistent('sogBtn', "groups");
    Session.set('studentSelected', false);
    $(".tab-pane").removeClass("active");
    $(".nav-pills li").removeClass("active");
    $("#studentsMain").addClass("active");
    $("#sM").addClass("active");
    $("#collapseStudents").removeClass("in");
  },
  'click .clases': function(event) {
    event.preventDefault();
    Session.set('className', '');
    Session.set('studentSelected', false);
    Session.set('groupSelected', false);
    $("#fondo").css("background-image", "");
    Router.go('classesPage');
  },
  'mouseenter #btnStudents': function(event) {
    event.preventDefault();
    $("#collapseStudents").addClass("in");
    //Router.go('/');
  },
  'mouseleave #collapseStudents .panel-body': function(event) {
    event.preventDefault();
    $("#collapseStudents").removeClass("in");
    //Router.go('/');
  },
  'click .btnCF': function(event) {
    event.preventDefault();
    Modal.show('notifyModal');
  }
  /*,
  'click #menu_lateral li': function(event) {
    event.preventDefault();
    $("#menu_lateral").toggleClass("visible");
    //Router.go('/');
  },
  'mouseenter #menuBtn': function(event) {
    event.preventDefault();
    $("#menu_lateral").toggleClass("visible");
    //Router.go('/');
  }
  ,
  'click a.btn-warning': function(event) {
    event.preventDefault();
    b=$(event.target).attr("href").substr(1);
    alert(b);
    hasIn=$("#"+b).hasClass("in");
    alert(hasIn);
    $(".panel-collapse").addClass("in");
    if ( hasIn ) {
      $("#"+b).removeClass("in");
      alert("esconder");
    } else {
      $("#"+b).addClass("in");
      alert("sacar");
    }
  }*/
});
