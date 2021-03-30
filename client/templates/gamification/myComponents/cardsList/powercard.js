Template.powercard.helpers({
  card_src: function(imageId) {
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/');
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_200,f_auto,dpr_auto/v1554810211/images/event-2930674_960_720.png";
      }
    }
  }
});

Template.powercard.events({
 'click img, click .glyphicon': function(event) {
    event.preventDefault();
    Session.set('imageType','card');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  }
});
