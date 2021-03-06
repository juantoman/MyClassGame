Template.chromesList.onRendered(function() {
  c=classes.findOne({_id: Session.get('classId')});
  if (!c.envelopePrice) {
    Meteor.call('envelopePrice',Session.get("classId"),0);
  }
  if (!c.stickersEnvelope) {
    Meteor.call('stickersEnvelope',Session.get("classId"),0);
  }
  // document.getElementById("logosvg").addEventListener("load", function() {
  //   var doc = this.contentDocument;
  //   var star = doc.getElementById("starsvg").addEventListener("click", function() {
  //     this.setAttribute("fill", "green");
  //   });
  // });
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
  },
  chromeTypes: function() {
    return classes.findOne({_id: Session.get('classId')}).chromeTypes;
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
  },
  'click #logosvg': function(event) {
    event.preventDefault();
    $('#starsvg').attr("href","/svg/CartaAzul.svg")
  },
  'change .badge-color': function(event) {
    event.preventDefault();
    //alert($(event.target).val());
    $(event.target).closest('.badge').css('background-color',$(event.target).val());
    Meteor.call('updateChromeTypeColor',Session.get('classId'),this._id, $(event.target).val());
  },
  'click .badge-add, click .badge-update': function(event) {
    event.preventDefault();
    //alert($(event.target).val());
    document.execCommand('selectAll');
    //$(event.target).select();
  },
  'keypress .badge-container .badge-add': function(event) {
    if (event.keyCode === 13) {
			event.preventDefault();
      //alert($(event.target).text());
      Meteor.call('addChromeType',Session.get('classId'),$(event.target).text());
      $(event.target).text("Nueva");
      document.execCommand('selectAll');
    }
  },
  'keypress .badge-container .badge-update': function(event) {
    if (event.keyCode === 13) {
			event.preventDefault();
      //alert($(event.target).text());
      Meteor.call('updateChromeTypeDesc',Session.get('classId'),this._id, $(event.target).text());
      $('.badge-add').focus();
      document.execCommand('selectAll');
    }
  },
  'focusout .badge-container .badge-update': function(event) {
			event.preventDefault();
      //alert($(event.target).text());
      Meteor.call('updateChromeTypeDesc',Session.get('classId'),this._id, $(event.target).text());
  },
  'change .chromeType': function(event) {
    event.preventDefault();
    Meteor.call('chromeType', event.target.name, event.target.id, event.currentTarget.value);
  },
 'click .addChromeType': function(event) {
    event.preventDefault();
    Meteor.call('addChromeType',Session.get('classId'),$("#addChromeTypeInput").val());
  },
 'click .delChromeType': function(event) {
    event.preventDefault();
    Meteor.call('delChromeType',Session.get('classId'),this._id);
  }
});
