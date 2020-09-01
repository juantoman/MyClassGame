Template.admin.rendered = function() {
  //Session.set('className', "");
}

Template.admin.helpers({
  claseTipo: function() {
    if (mcgParameters.find({'typeClasses':Session.get('classId')}).count() == 0) {
      return false;
    } else {
      return true;
    }
  },
  admin: function() {
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      return true;
    } else {
      return false;
    }
  }
});
Template.admin.events({
  'click .btn-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.id);
    Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
    backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
    $("#fondo").css("background-image", "url("+backImg+")");
    Session.set('orderStudents', "XP");
    Session.set('invertOrder', "checked");
    Router.go('studentsMainPage',{_id:Session.get('classId')});
  },
  'click #btn-duplicar': function(event) {
    event.preventDefault();
    cId=Session.get('classId');
    /*Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
    var c = classes.findOne({'_id': cId});
    delete c._id;
    c.teacherId=Meteor.userId();
    c.className="Copia_" + c.className;
    c.iniHP=10;
    Meteor.call('classDuplicate',c,cId);
    swal({
      title: TAPi18n.__('duplicateClass'),
      type: 'success'
    });
    /*students.find({'classId': cId}).forEach(function(student){
      var newStudent = student;
      delete student._id;
      student.classId=Session.get('classId');
      Meteor.call('studentInsert',student);
    });*/
    //Router.go('classesPage');
  },
  'click #btn-eliminar': function(event) {
    event.preventDefault();
    Modal.show('deleteClass');
  },
  'click #btn-tipo': function(event) {
    event.preventDefault();
    if (mcgParameters.find().count()==0) {
      var params = {
        typeClasses:[],
        passMCG: "@MCG2406?"
      };
      Meteor.call('paramsInsert',params);
      Meteor.call('typePush',Session.get('classId'));
    }
    if (mcgParameters.find({typeClasses:Session.get('classId')}).count() == 0) {
      Meteor.call('typePush',Session.get('classId'));
    } else {
      Meteor.call('typePull',Session.get('classId'));
    }
  },
  'click #btn-store-class': function(event) {
    event.preventDefault();
    Meteor.call('classStore',Session.get('classId'));
  },
  'click #btn-restore': function(event) {
    event.preventDefault();
    Meteor.call('classStore',Session.get('classId'));
  },
  'click #changeRol': function(event) {
    event.preventDefault();
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      type=Meteor.users.findOne(Meteor.user()).userType;
      Meteor.call('userTypeInsert', "");
      Session.setPersistent('userType', "");
      Router.go('index');
    }
  },
  'click #adminClass': function(event) {
    event.preventDefault();
    if (Meteor.user().services.google.email == "Juan.Torres@iestacio.com") {
      Modal.show('adminClass');
    }
    /*Session.set('classId', event.target.id);
    Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
  },
  'click #btn-acceso-estudiantes': function(event) {
    event.preventDefault();
    students.find({'classId':Session.get('classId')}).forEach(function(s){
      Meteor.call('createStudentUser', s._id, s.alias, Session.get('classId'));
    });
    Modal.show('studentsPrint');
  },
  'click #btn-eliminar-acceso-estudiantes': function(event) {
    event.preventDefault();
    students.find({'classId':Session.get('classId')}).forEach(function(s){
      Meteor.call('deleteStudentUser', s.userId, s._id);
    });
  },
  'click #btn-imprimir-estudiantes': function(event) {
    event.preventDefault();
    Modal.show('studentsPrint');
  }
});
