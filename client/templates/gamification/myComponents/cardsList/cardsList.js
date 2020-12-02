Template.cardsList.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  cardTypes: function() {
    return classes.findOne({_id: Session.get('classId')}).cardTypes;
  },
  card_src: function(imageId) {
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
  selType: function(e1,e2) {
    if (e1==e2) {
      return "selected"
    } else {
      return "";
    }
  }
});

Template.cardsList.events({
  'submit form.createCardForm': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    price = isNaN($(event.target).find('[name=cardPrice]').val()) || $(event.target).find('[name=cardPrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardPrice]').val());
    level = isNaN($(event.target).find('[name=cardLevel]').val()) || $(event.target).find('[name=cardLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardLevel]').val());
    var card = {
      classId: Session.get('classId'),
      cardName: $(event.target).find('[name=cardName]').val(),
      cardDescription: $(event.target).find('[name=cardDescription]').val(),
      cardLevel: level,
      cardPrice: price,
      cardImage: Session.get('selectedImage'),
      cardType: $(event.target).find('[name=cardType]').val(),
      createdOn: new Date()
    };
    Meteor.call('cardInsert', card);
  },
  'submit form.cardForm': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    price = isNaN($(event.target).find('[name=cardPrice]').val()) || $(event.target).find('[name=cardPrice]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardPrice]').val());
    level = isNaN($(event.target).find('[name=cardLevel]').val()) || $(event.target).find('[name=cardLevel]').val() == "" ? parseInt(0): parseInt($(event.target).find('[name=cardLevel]').val());
    var card = {
      cardName: $(event.target).find('[name=cardName]').val(),
      cardDescription: $(event.target).find('[name=cardDescription]').val(),
      cardLevel: level,
      cardPrice: price,
      cardImage: Session.get('selectedImage'),
      cardType: $(event.target).find('[name=cardType]').val()
    };
    Meteor.call('cardUpdate', this._id, card);
  },
  'click .btnDeleteCard': function(event) {
    event.preventDefault();
    Meteor.call('cardDelete',this._id);
  },
  /*
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('cardUpdate', event.target.name, event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('cardDelete',event.target.name);
    }
  },
  */
  'change .cardType': function(event) {
    event.preventDefault();
    Meteor.call('cardUpdate', event.target.name, event.target.id, event.currentTarget.value);
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','card');
    Session.set('idElementImage',event.currentTarget.title);
    Modal.show('imagesTemplate');
  },
 'click .addCardType': function(event) {
    event.preventDefault();
    Meteor.call('addCardType',Session.get('classId'),$("#addCardTypeInput").val());
  },
 'click .delCardType': function(event) {
    event.preventDefault();
    Meteor.call('delCardType',Session.get('classId'),event.currentTarget.title);
  }
});
