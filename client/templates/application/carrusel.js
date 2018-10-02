Template.carrusel.helpers({
  profes: function() {
    return Meteor.users.find().count;
  },
  estudiantes: function() {
    return Meteor.users.find().count;
  }
});
Template.carrusel.events({
  /*'click button': function(event) {
    event.preventDefault();
    Session.set('tutorial', true);
  }*/
});