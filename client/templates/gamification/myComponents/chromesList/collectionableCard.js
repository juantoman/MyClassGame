Template.collectionableCard.helpers({
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
  },
  chromeTypes: function() {
    return classes.findOne({_id: Session.get('classId')}).chromeTypes;
  },
  selType: function(e1,e2) {
    if (e1==e2) {
      return "selected"
    } else {
      return "";
    }
  },
  chromeTypeData: function(chromeType) {
    chromeTypes=classes.findOne({_id: Session.get('classId')}).chromeTypes;
    let obj = chromeTypes.find(o => o._id === chromeType);
    if (obj) {
      return obj;
    } else {
      return true;
    }
  },
});

Template.collectionableCard.events({
  'click .change_card_image': function(event) {
    event.preventDefault();
    Session.set('imageType','chrome');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
    event.stopPropagation();
  },
  'click .element-card__image, click .element-card-full__image, click .element-card-noMCG__unit-name': function(event) {
    event.preventDefault();
    $('.element-card-inner').removeClass('element-card-rotated');
    $(event.target).closest('.element-card-inner').addClass('element-card-rotated');
  },
  'click .cardClose': function(event) {
    event.preventDefault();
    $('.element-card-inner').removeClass('element-card-rotated');
    event.stopPropagation();
  },
  'click .btnMCGCard, click .btnEnvelopeChrome, click .btnSingleChrome': function(event) {
    event.preventDefault();
    $(event.target).toggleClass('btnCardSelected');
    event.stopPropagation();
  },
  'submit form.elementCardForm': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    price = isNaN($(event.target).find('[name=chromePrice]').val()) || $(event.target).find('[name=chromePrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromePrice]').val());
    level = isNaN($(event.target).find('[name=chromeLevel]').val()) || $(event.target).find('[name=chromeLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromeLevel]').val());
    mcgType=$(event.target).find('[name=btnMCGCard]').hasClass("btnCardSelected");
    envelopeChrome=$(event.target).find('[name=btnEnvelopeChrome]').hasClass("btnCardSelected");
    singleChrome=$(event.target).find('[name=btnSingleChrome]').hasClass("btnCardSelected");
    var chrome = {
      chromeName: $(event.target).find('[name=chromeName]').val(),
      chromeDescription: $(event.target).find('[name=chromeDescription]').val(),
      chromeLevel: level,
      chromePrice: price,
      chromeMCG: mcgType,
      envelopeChrome: envelopeChrome,
      singleChrome: singleChrome,
      chromeImage: Session.get('selectedImage'),
      chromeType: $(event.target).find('[name=chromeType]').val()
    };
    Meteor.call('chromeUpdate', this._id, chrome);
  },
  'click .btnDeleteElementCard': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('delete') + " " +  TAPi18n.__('collectionable'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('chromeDelete',this._id);
        swal({
          title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('deleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'change .chromeType': function(event) {
    event.preventDefault();
    var chrome = {
      chromeType: $(event.target).val()
    };
    Meteor.call('chromeUpdate', this._id, chrome);
  },
  'click .cardgem': function(event) {
    event.preventDefault();
    ccolor = $(event.target).attr('src');
    if (ccolor.indexOf("green")!=-1) {
      ncolor="orange";
    }
    if (ccolor.indexOf("orange")!=-1) {
      ncolor="red";
    }
    if (ccolor.indexOf("red")!=-1) {
      ncolor="green";
    }
    //var res = str.replace("Microsoft", "W3Schools");
    //alert($(event.target).attr('src'));
    var chrome = {
      chromeWeird: ncolor
    };
    Meteor.call('chromeUpdate', this._id, chrome);
  }
  // 'mouseover .element-card-data': function(event) {
  //    event.target.scrollTo(0,500);
  // },
  // 'mouseleave .element-card-data': function(event) {
  //   event.target.scrollTo(0,-500);
  // }
});
