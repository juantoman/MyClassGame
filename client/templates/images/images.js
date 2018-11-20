Template.images.onRendered(function() {
   $.getScript("https://media-library.cloudinary.com/global/all.js");
});

Template.images.helpers({
  images: function() {
    return images.find( { classId: Session.get('classId'), type: Session.get('imageType') } );
  },
  checkedImage: function(idImage) {
    idElement=badges.findOne({_id: Session.get('idElementImage')}).badgeImage;
    if (idImage==idElement) {
      return "checked";
    } else {
      return "";
    }
  }
});

Template.images.events({
  'click #notesSubmit': function(event) {
    event.preventDefault();
    if (Session.get('idElementImage')){
      if (Session.get('imageType')=="badge") {
        Meteor.call('imageBadgeUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
    } else {
      Session.set('selectedImage',$("input[name='imageId']:checked").val());
    }
    Modal.hide('images');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('images');
  },
  'click #cloudinary': function(event) {
    event.preventDefault();
    cloudinary.openUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
      if (result.event=="success"){
        var image = {
          classId:Session.get('classId'),
          type: Session.get('imageType'),
          image_url: result.info.url,
          createdOn: new Date()
        };
        Meteor.call('imageInsert',image);
      }
    });
  }
});