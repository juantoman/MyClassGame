Template.classesPage.rendered = function() {
  Session.set('className', "");
}

Template.classesPage.helpers({
  classe: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return classes.find({teacherId: teacherId._id, stored: false }, {sort: {submitted: -1}});
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      //c=Meteor.users.find({_id:Meteor.userId()});
      return classes.find({"_id": { "$in": c }, stored: false });
      //return classes.find({_id: teacherId._id}, {sort: {submitted: -1}});
    }
  },
  stored: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return classes.find({teacherId: teacherId._id, stored: true }, {sort: {submitted: -1}});
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      //c=Meteor.users.find({_id:Meteor.userId()});
      return classes.find({"_id": { "$in": c }, stored: true });
      //return classes.find({_id: teacherId._id}, {sort: {submitted: -1}});
    }
  },
  types: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    var tipos=mcgParameters.findOne().typeClasses;
    return classes.find({'_id': { "$in": tipos } });
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  cName: function() {
    var cName=Session.get('className');
    if ( cName == "") {
      return true;
    } else {
      return false;
    }
  },
  classImage: function() {
    avatar=this.groupImg;
    if (avatar) {
      if (avatar.substring(0, 4)=="http") {
        return avatar;
      } else {
        return images.findOne({_id: avatar}).image_url;
      }
    } else {
      return "https://res.cloudinary.com/myclassgame/image/upload/v1543412151/proves/grupo.png";
    }
  }
});
Template.classesPage.events({
  'click .btn-class': function(event) {
    event.preventDefault();
    Session.set('classId', this._id);
    Session.set('className', this.className);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
    backImg=classes.findOne({"_id": Session.get('classId')}).backImg;
    $("#fondo").css("background-image", "url("+backImg+")");
    Session.set('orderStudents', "XP");
    Session.set('invertOrder', "checked");
    Router.go('myNav',{_id:Session.get('classId')});
  },
  'click .btn-double-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.id);
    cId=Session.get('classId');
    /*Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
    var c = classes.findOne({'_id': event.target.id});
    delete c._id;
    c.className="Copia_" + event.target.name;
    Meteor.call('classDuplicate',c,cId);
    /*students.find({'classId': cId}).forEach(function(student){
      var newStudent = student;
      delete student._id;
      student.classId=Session.get('classId');
      Meteor.call('studentInsert',student);
    });
    Router.go('myNav');*/
  },
  'click .btn-type': function(event) {
    event.preventDefault();
    Session.set('classId', this._id);
    cId=Session.get('classId');
    /*Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);*/
    var c = classes.findOne({'_id': this._id});
    delete c._id;
    c.teacherId=Meteor.userId();
    c.className="Copia_" + this.className;
    Meteor.call('classDuplicate',c,cId);
    /*students.find({'classId': cId}).forEach(function(student){
      var newStudent = student;
      delete student._id;
      student.classId=Session.get('classId');
      Meteor.call('studentInsert',student);
    });*/
    
  },
  'click .btn-delete-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.name);
    Modal.show('deleteClass');
  },
  'click .btn-store-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.name);
    Meteor.call('classStore',Session.get('classId'));
  },
  'click .btn-restore': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.name);
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
  }
});
