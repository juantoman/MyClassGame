Template.missionCard2Template.onRendered(function() {
  $('.missionWrapper').addClass('loaded');
});

Template.missionCard2Template.helpers({
  cardPic: function() {
    if (this.missionImg) {
      url=images.findOne({_id: this.missionImg}).image_url;
    } else {
      cardPic=classes.findOne({_id:Session.get('classId')}).backImg;
      if (cardPic.substring(0, 4)=="http") {
        url=cardPic;
      } else {
        url=images.findOne({_id: cardPic}).image_url;
      }
    }
    return "background-image: url(" + url + ");"
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
  'click .top-pic, click .missionBadge': function(event) {
    event.preventDefault();
    Session.set('imageType','mission');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
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
    var chal = {
      classId: Session.get('classId'),
      //type: MoC,
      IoG: $(event.target).find('[name=IoG]').val(),
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
      order: n,
      notebookDependence: $(event.target).find('[name=notebookCheck]').prop('checked'),
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
