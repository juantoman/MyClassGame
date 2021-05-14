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
    const el = document.createElement('textarea');
    //el.value = "https://www.myclassgame.es/mcgapi/mcgapi.html?e=badge&id="+this._id;
    el.value = '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe frameborder="0" width="1200" height="675" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.myclassgame.es/mcgapi/powerAPI.html?e=power&amp;id='+ this._id +'" type="text/html" allowfullscreen="true" scrolling="yes"></iframe></div></div>'
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
  // 'mouseover .power-card-data': function(event) {
  //    event.target.scrollTo(0,500);
  // },
  // 'mouseleave .power-card-data': function(event) {
  //   event.target.scrollTo(0,-500);
  // }
});
