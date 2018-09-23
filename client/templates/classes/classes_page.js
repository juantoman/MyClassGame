Template.classesPage.rendered = function() {
  Session.set('className', "");
}

Template.classesPage.helpers({
  classe: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return classes.find({teacherId: teacherId._id}, {sort: {submitted: -1}});
    } else {
      c=Meteor.users.find({_id:Meteor.userId()}).fetch()[0].classes;
      //c=Meteor.users.find({_id:Meteor.userId()});
      return classes.find({"_id": { "$in": c }});
      //return classes.find({_id: teacherId._id}, {sort: {submitted: -1}});
    }
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
  }
});
Template.classesPage.events({
  'click .btn-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.id);
    Session.set('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Session.set('studentSelected', false);
    Session.setPersistent('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
    //Router.go('myNav');
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
    });*/
    //Router.go('myNav');
  },
  'click .btn-delete-class': function(event) {
    event.preventDefault();
    Session.set('classId', event.target.name);
    Modal.show('deleteClass');
  }
});
