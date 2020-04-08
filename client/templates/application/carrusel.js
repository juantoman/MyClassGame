Template.carrusel.helpers({
  profes: function() {
    return Meteor.users.find().count;
  },
  estudiantes: function() {
    return Meteor.users.find().count;
  }
});
Template.carrusel.events({
  'click .btnSignin': function(event) {
    event.preventDefault();
    Modal.show('signinModal');
  }
});
