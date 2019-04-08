Template.cardsList.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  card_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "http://res.cloudinary.com/myclassgame/image/upload/v1542714723/myclassgame/Gold_Badge_Template_Clipart_Picture_ohwmt7.png";
      }
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
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','card');
    Session.set('idElementImage',event.currentTarget.title);
    Modal.show('images');
  }
});
