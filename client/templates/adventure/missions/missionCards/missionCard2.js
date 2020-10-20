function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

Template.missionCard2Template.onRendered(function() {
  $('.missionWrapper').addClass('loaded');
});

Template.missionCard2Template.helpers({
  cardPic: function() {
    if (this.missionImg) {
      url=images.findOne({_id: this.missionImg}).image_url;
      url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
    } else {
      cardPic=classes.findOne({_id:Session.get('classId')}).backImg;
      if (cardPic.substring(0, 4)=="http") {
        url=cardPic;
      } else {
        url=images.findOne({_id: cardPic}).image_url;
        url=url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
      }
    }
    return "background-image: url(" + url + ");"
  },
  missionType: function(tipo) {
    if (tipo==this.IoG) {
      return true;
    } else {
      return false;
    }
  },
  otherColor: function() {
    /*
    var c1 = 0x000851; // Stored as 16777215
    var c2 = 0x1CB5E0; // Stored as 16711680
    d = c1 - c2; // 16777215 - 16711680 = 65535
    c=this.missionColor.substr(1, 6);
    missionColor=parseInt(c, 16);
    result=missionColor+d;
    console.log("AAAAAAAAAAAAAAAAAA");
    console.log(result);
    if ( result >= 16777215) {
      result=result-16777215;
    }
    var color = result.toString(16); // 'ffff', converted back to hex
    color = "#"+"000000".substr(0, 6 - color.length) + color;

    */
    color=LightenDarkenColor(this.missionColor, 150);
    if (color>="#ffffff") {
      color=LightenDarkenColor(this.missionColor,-150);
    }
    return color;
  },
  isTeacher: function() {
    if (Session.get('userType')=="teacher") {
      return true;
    } else {
      return false;
    };
  },
  teacher: function() {
    if (Session.get('userType')!="teacher") {
     return "readonly";
    };
  },
  disTeacher: function() {
    if (Session.get('userType')!="teacher") {
     return "disabled";
    };
  },
  TeacherOrVisible: function() {
    if (Session.get('userType')=="teacher" || this.missionVisible) {
      return true;
    } else {
      return false;
    };
  }
});


Template.missionCard2Template.events({
  'click .undoBtn': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    event.stopPropagation();
  },
  'click .more-info': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    $(event.currentTarget).closest('.missionCard2').toggleClass('flip');
    $('.arrow').remove();
  },
  'click .missionDeleteBtn': function(event) {
    event.preventDefault();
    Session.set('missionId',this._id)
    Modal.show('deleteMission');
  },
  'submit form.missionForm': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked'));
    //n=challenges.find({classId: Session.get('classId')}).count()+1;
    var chal = {
      IoG: $(event.target).find('[name=IoG]').val(),
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
      notebookDependence: $(event.target).find('[name=notebookCheck]').prop('checked')
    };
    Meteor.call('chalUpdate', this._id, chal);
  },
  'click .missionBadge': function(event) {
    event.preventDefault();
    if (Session.get('userType')=="teacher") {
      Session.set('imageType','mission');
      Session.set('idElementImage',this._id);
      Modal.show('imagesTemplate');
    }
  },
  'click .missionVisibleBtn': function(event) {
    event.preventDefault();
    /*
    if ($(event.currentTarget).find('[data-fa-i2svg]').attr('data-icon')== 'eye') {
      $(event.currentTarget).find('[data-fa-i2svg]').attr('data-icon','eye-slash');
    } else {
      $(event.currentTarget).find('[data-fa-i2svg]').attr('data-icon','eye');
    }
    */
    Meteor.call('missionVisibleToggle', this._id);
  },
  'change .missionColor': function(event) {
    event.preventDefault();
    Meteor.call('missionColorChange', this._id, event.currentTarget.value);
  },
  'click .missionInfo': function(event) {
    event.preventDefault();
    $("#missionsPage").addClass("oculto");
    $("#missionPage").removeClass("oculto");
    Session.set('chalId',this._id);
  }
})

Template.missionCardCreate.events({
  'click .undoBtn': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    event.stopPropagation();
  },
  'click .more-info': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    $(event.currentTarget).closest('.missionCard2').toggleClass('flip');
    $('.arrow').remove();
  },
  'submit form.missionCreateForm': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked'));
    //n=challenges.find({classId: Session.get('classId')}).count()+1;
    n=challenges.find({classId: Session.get('classId')}).count()+1;
    if ($(event.target).find('[name=IoG]').val() == "Grupal"){
      MoC="Misión";
    } else {
      MoC="Reto";
    };
    var chal = {
      classId: Session.get('classId'),
      type: MoC,
      IoG: $(event.target).find('[name=IoG]').val(),
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
      order: n,
      notebookDependence: $(event.target).find('[name=notebookCheck]').prop('checked'),
      missionVisible: false,
      createdOn: new Date()
    };
    Meteor.call('chalInsert', chal);
  },
  'click .top-pic, click .missionBadge': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    $(event.currentTarget).closest('.missionCard2').toggleClass('flip');
    $('.arrow').remove();
  }
})
