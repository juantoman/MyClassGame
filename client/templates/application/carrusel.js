Template.carrusel.onRendered(function() {
   /*
   accountsUIBootstrap3.setLanguage("es");
   TAPi18n.setLanguage("es");
   */
   // const myPWA = document.getElementById('installPWA');
   // myPWA.openPrompt()	;
   //document.querySelector('pwa-install').showopen=true;
   //document.querySelector('pwa-install').openPrompt();
});

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
    Session.set('userType', "teacher");
    Modal.show('signinModal');
  },
  'click .hiddenBtnSignin': function(event) {
    event.preventDefault();
    Modal.show('signinModal');
  },
  'click .btnCF': function(event) {
    event.preventDefault();
    Modal.show('notifyModal');
  },
  'click .installPWA': function(event) {
    event.preventDefault();
  }
});
