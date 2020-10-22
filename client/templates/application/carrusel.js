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
  },
  'click .installPWA': function(event) {
    event.preventDefault();
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can add to home screen
      showInstallPromotion();
      
    });
  }
});
