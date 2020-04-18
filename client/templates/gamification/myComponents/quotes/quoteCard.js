Template.quoteCard.helpers({
  quote_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1554810211/images/quote-2930674_960_720.png";
      }
    }
  }
});

Template.quoteCard.events({
 'click img, click .glyphicon': function(quote) {
    quote.prquoteDefault();
    Session.set('imageType','quote');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  }
});
