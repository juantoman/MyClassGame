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
    //location.href = 'https://www.myclassgame.tk/';
    Modal.show('signinModal');
  },
  'click .hiddenBtnSignin': function(event) {
    event.preventDefault();
    Modal.show('signinModal');
  },
  'click .btnCF': function(event) {
    event.preventDefault();
    Modal.show('notifyModal');
  }
});
