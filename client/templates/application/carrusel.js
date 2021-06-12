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
    if ( $(event.currentTarget).hasClass("btnGamiRight") ) {
      Session.set('gamiright', true);
    } else {
      Session.set('gamiright', false);
    }
    if ( $(event.currentTarget).hasClass("btnMCGDemo") ) {
      Session.set('mcgdemo', true);
    } else {
      Session.set('mcgdemo', false);
    }
    if (Session.get('mcgdemo')) {
      user="demo";
      password="mcgdemo";
      Meteor.loginWithPassword(user, password,function(error){
        if(error) {
          swal({
              title: TAPi18n.__('loginError'),
              text: error.reason,
              icon: "warning",
          });
        }else{
          Session.setPersistent('navItem', "Students");
          Session.setPersistent('sogBtn',"students");
          Session.setPersistent('golBtn',"grid");
          Session.set('studentSelected', false);
          Session.set('orderStudents', "XP");
          Session.set('invertOrder', "checked");
          Router.go('classesPage');
        }
      });
    } else {
      Modal.show('signinModal');
    }
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
