Template.powercard.helpers({
  card_src: function(imageId,high) {
    if (high) {
      h="h_400";
    } else {
      h="h_200";
    }
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,' + h + ',f_auto,dpr_auto/');
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,' + h + ',f_auto,dpr_auto/');
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto," + h + ",f_auto,dpr_auto/v1554810211/images/event-2930674_960_720.png";
      }
    }
  }
});

Template.powercard.events({
  'click .change_card_image': function(event) {
    event.preventDefault();
    Session.set('imageType','card');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
    event.stopPropagation();
  },
  'click .power-card__image, click .power-card-full__image, click .power-card-noMCG__unit-name': function(event) {
    event.preventDefault();
    $('.power-card-inner').removeClass('power-card-rotated');
    $(event.target).closest('.power-card-inner').addClass('power-card-rotated');
  },
  'click .cardClose': function(event) {
    event.preventDefault();
    $('.power-card-inner').removeClass('power-card-rotated');
    event.stopPropagation();
  },
  'click .btnMCGCard': function(event) {
    event.preventDefault();
    $(event.target).toggleClass('MCGCard');
    event.stopPropagation();
  },
  'submit form.powerCardForm': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    price = isNaN($(event.target).find('[name=cardPrice]').val()) || $(event.target).find('[name=cardPrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardPrice]').val());
    level = isNaN($(event.target).find('[name=cardLevel]').val()) || $(event.target).find('[name=cardLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardLevel]').val());
    energy = isNaN($(event.target).find('[name=cardEnergy]').val()) || $(event.target).find('[name=cardEnergy]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardEnergy]').val());
    mcgType=$(event.target).find('[name=btnMCGCard]').hasClass("MCGCard");
    var card = {
      cardName: $(event.target).find('[name=cardName]').val(),
      cardDescription: $(event.target).find('[name=cardDescription]').val(),
      cardLevel: level,
      cardPrice: price,
      cardEnergy: energy,
      cardMCG: mcgType,
      cardImage: Session.get('selectedImage'),
      cardType: $(event.target).find('[name=cardType]').val()
    };
    Meteor.call('cardUpdate', this._id, card);
  },
  'click .btnDeletePowerCard': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('power'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('cardDelete',this._id);
        swal({
          title: TAPi18n.__('power') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .btnUrlPower': function(event) {
    event.preventDefault();
    Session.set("sharedElement", {'type': 'power', 'id': this._id, 'name': this.cardName} )
    Modal.show('shareModal');
  }
  // 'mouseover .power-card-data': function(event) {
  //    event.target.scrollTo(0,500);
  // },
  // 'mouseleave .power-card-data': function(event) {
  //   event.target.scrollTo(0,-500);
  // }
});
