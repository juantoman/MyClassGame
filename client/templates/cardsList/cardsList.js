Template.cardsList.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  cardTypes: function() {
    return classes.findOne({_id: Session.get('classId')}).cardTypes;
  },
  card_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1554809984/images/22190738841_41626354b7_b.jpg";
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
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var card = {
      classId: Session.get('classId'),
      cardName: $(event.target).find('[name=cardName]').val(),
      cardDescription: $(event.target).find('[name=cardDescription]').val(),
      cardLevel: $(event.target).find('[name=cardLevel]').val(),
      cardPrice: $(event.target).find('[name=cardPrice]').val(),
      cardImage: Session.get('selectedImage'),
      cardType: $(event.target).find('[name=cardType]').val(),
      createdOn: new Date()
    };
    Meteor.call('cardInsert', card);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('cardUpdate', event.target.name, event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('cardDelete',event.target.name);
    }
  },
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
