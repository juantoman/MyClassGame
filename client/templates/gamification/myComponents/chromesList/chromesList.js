Template.chromesList.onRendered(function() {
  c=classes.findOne({_id: Session.get('classId')});
  if (!c.envelopePrice) {
    Meteor.call('envelopePrice',Session.get("classId"),0);
  }
  if (!c.stickersEnvelope) {
    Meteor.call('stickersEnvelope',Session.get("classId"),0);
  }
})

Template.chromesList.helpers({
  chromes: function() {
    return chromes.find({classId: Session.get('classId')});
  },
  chrome_src: function(imageId) {
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/');
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/');
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/v1554809984/images/22190738841_41626354b7_b.jpg";
      }
    }
  },
  myClass: function() {
    return classes.findOne({_id: Session.get('classId')});
  }
});

Template.chromesList.events({
  'submit form.createChromeForm': function(event) {
    event.preventDefault();
    price = isNaN($(event.target).find('[name=chromePrice]').val()) || $(event.target).find('[name=chromePrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromePrice]').val());
    level = isNaN($(event.target).find('[name=chromeLevel]').val()) || $(event.target).find('[name=chromeLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromeLevel]').val());
    var chrome = {
      classId: Session.get('classId'),
      chromeName: $(event.target).find('[name=chromeName]').val(),
      chromeDescription: $(event.target).find('[name=chromeDescription]').val(),
      chromeLevel: level,
      chromePrice: price,
      chromeImage: Session.get('selectedImage'),
      createdOn: new Date()
    };
    Meteor.call('chromeInsert', chrome);
  },
  'submit form.chromeForm': function(event) {
    event.preventDefault();
    price = isNaN($(event.target).find('[name=chromePrice]').val()) || $(event.target).find('[name=chromePrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromePrice]').val());
    level = isNaN($(event.target).find('[name=chromeLevel]').val()) || $(event.target).find('[name=chromeLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=chromeLevel]').val());
    var chrome = {
      chromeName: $(event.target).find('[name=chromeName]').val(),
      chromeDescription: $(event.target).find('[name=chromeDescription]').val(),
      chromeLevel: level,
      chromePrice: price
    };
    Meteor.call('chromeUpdate', this._id, chrome);
  },
  'click .btnDeleteChrome': function(event) {
    event.preventDefault();
    Meteor.call('chromeDelete',this._id);
  },
  'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','chrome');
    Session.set('idElementImage',event.currentTarget.title);
    Modal.show('imagesTemplate');
  },
  'change .envelopePrice': function(event) {
    event.preventDefault();
    Meteor.call('envelopePrice',Session.get("classId"),parseInt($(event.target).val()));
  },
  'change .stickersEnvelope': function(event) {
    event.preventDefault();
    Meteor.call('stickersEnvelope',Session.get("classId"),parseInt($(event.target).val()));
  }
});
