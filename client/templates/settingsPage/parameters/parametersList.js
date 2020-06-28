Template.parametersList.onRendered(function() {
   $.getScript("https://widget.cloudinary.com/v2.0/global/all.js");
   $.getScript("https://media-library.cloudinary.com/global/all.js");
});

Template.parametersList.helpers({
  parametersClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  },
  selEval: function(e) {
    if (classes.findOne({_id:Session.get('classId')}).evaluation==e) {
      return "selected"
    } else {
      return "";
    }
  },
  ch: function(visible) {
    if (visible) {
      return "checked"
    }
  },
  gImage: function() {
    avatar=this.groupImg;
    if (avatar.substring(0, 4)=="http") {
      return avatar;
    } else {
      cloudinary_url=images.findOne({_id: avatar}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  },
  sImage: function() {
    avatar=this.studentImg;
    if (avatar.substring(0, 4)=="http") {
      return avatar;
    } else {
      cloudinary_url=images.findOne({_id: avatar}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  },
  bImage: function() {
    avatar=this.backImg;
    if (avatar.substring(0, 4)=="http") {
      return avatar;
    } else {
      cloudinary_url=images.findOne({_id: avatar}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
      return cloudinary_url;
    }
  }
});

Template.parametersList.events({
  /*'change #studentImg': function(event) {
    event.preventDefault();
    Meteor.call('studentImgUpdate', Session.get('classId'), event.currentTarget.value);
  },
  'change #groupImg': function(event) {
    event.preventDefault();
    Meteor.call('groupImgUpdate', Session.get('classId'), event.currentTarget.value);
  },*/
  'change #iniHP': function(event) {
    event.preventDefault();
    Meteor.call('iniHPUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #perXP': function(event) {
    event.preventDefault();
    Meteor.call('perXPUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #perBG': function(event) {
    event.preventDefault();
    Meteor.call('perBGUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #perMissions': function(event) {
    event.preventDefault();
    Meteor.call('perMissionsUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #perChallenges': function(event) {
    event.preventDefault();
    Meteor.call('perChallengesUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #perHP': function(event) {
    event.preventDefault();
    Meteor.call('perHPUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  'change #hourXP': function(event) {
    event.preventDefault();
    Meteor.call('hourXPUpdate', Session.get('classId'), parseInt(event.currentTarget.value));
  },
  /*
  'click #studentImg': function(event) {
    event.preventDefault();
    cloudinary.openUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
      //console.log(result);
      if (result.event=="success"){
        //$("#studentImg").val(result.info.url);
        Meteor.call('studentImgUpdate', Session.get('classId'), result.info.url);
      }
    });
  },
  'click #groupImg': function(event) {
    event.preventDefault();
    cloudinary.openUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
      //console.log(result);
      if (result.event=="success"){
        //$("#groupImg").val(result.info.url);
        Meteor.call('groupImgUpdate', Session.get('classId'), result.info.url);
      }
    });
  },
  'click #backImg': function(event) {
    event.preventDefault();
    cloudinary.openUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
      //console.log(result);
      if (result.event=="success"){
        $("#backImg").val(result.info.url);
        Meteor.call('backImgUpdate', Session.get('classId'), result.info.url);
      }
    });
  },
  */
  'change select#evaluacion': function(event) {
    event.preventDefault();
    Session.setPersistent('evaluation', $(event.target).val());
    Meteor.call('changeEvaluation', Session.get('classId'),$(event.target).val());
  },
  'change #avatarVisible': function(event) {
    event.preventDefault();
    Meteor.call('avatarVisibleChange', Session.get('classId'), event.currentTarget.checked);
  },
  'change #onlyMyStudent': function(event) {
    event.preventDefault();
    Meteor.call('onlyMyStudentChange', Session.get('classId'), event.currentTarget.checked);
  },
  'change #CoinXP': function(event) {
    event.preventDefault();
    Meteor.call('CoinXPChange', Session.get('classId'), event.currentTarget.checked);
  },
  'click #btn-reset': function(event) {
    event.preventDefault();
    Modal.show('resetClass');
    //Meteor.call('avatarVisibleChange', Session.get('classId'), event.currentTarget.checked);
  },
  'click #btn-reset': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('resetAll'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('resetClass', Session.get('classId'));
        swal({
          title: TAPi18n.__('resetedPoints'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    /*
    swal({
      title: "¿Estás seguro de querer resetear todas las puntuaciones de la clase?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('resetClass', Session.get('classId'));
          break;
      }
    })*/
    Modal.show('resetClass');
    //Meteor.call('avatarVisibleChange', Session.get('classId'), event.currentTarget.checked);
  },
  'click #btn-resetXPHP': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('resetStudent'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('resetXPHP', Session.get('classId'));
        swal({
          title: TAPi18n.__('resetedPoints'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
    /*
    swal({
      title: "¿Estás seguro de querer resetar los XP y HP de los alumnos?",
      buttons: {
        NO: "No",
        SÍ: true,
      },
      icon: "warning"
    })
    .then((value) => {
      switch (value) {
        case "SÍ":
          Meteor.call('resetXPHP', Session.get('classId'));
          break;
      }
    })*/
  },
  'click .studentImage': function(event) {
    event.preventDefault();
    Session.set('imageType','avatar');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
  'click .groupImage': function(event) {
    event.preventDefault();
    Session.set('imageType','group');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
  'click .backImage': function(event) {
    event.preventDefault();
    Session.set('imageType','backImg');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
  'click #delBackImage': function(event) {
    event.preventDefault();
    Meteor.call('backImgUpdate',Session.get('idElementImage'),'');
    $("#mainTab").css('background-image','');
    $(".studentProfile").css('background-image','');
    $(".opacityDiv").toggleClass('opacityProfile');
  }
});
