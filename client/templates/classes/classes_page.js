Template.classesPage.helpers({
  classe: function() {
    var teacherId = Meteor.user();
    var userType=Session.get('userType');
    if ( userType == "teacher") {
      return classes.find({teacherId: teacherId._id}, {sort: {submitted: -1}});
    } else {
      return classes.find({teacherId: teacherId._id}, {sort: {submitted: -1}});
    }
  }
});
Template.classesPage.events({
  'click .btn-class': function(event) {
    event.preventDefault();
    Session.setPersistent('classId', event.target.id);
    Session.setPersistent('className', event.target.name);
    Session.setPersistent('navItem', "Students");
    Session.setPersistent('sogBtn',"students");
    Session.setPersistent('golBtn',"grid");
    Router.go('myNav');
  },
  'click .btn-delete': function(event) {
    event.preventDefault();
    alert("Borrar clase");
    //Meteor.call('classDelete', event.target.name);
  }
});
