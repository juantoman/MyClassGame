Template.cardCard.helpers({
  card_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1554810211/images/event-2930674_960_720.png";
      }
    }
  }
});

Template.cardCard.events({
 'click img, click .glyphicon': function(event) {
    event.preventDefault();
    Session.set('imageType','card');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  }
});
