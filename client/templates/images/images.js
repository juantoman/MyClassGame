Template.images.onRendered(function() {
   $.getScript("https://media-library.cloudinary.com/global/all.js");
});

Template.images.helpers({
  images: function() {
    return images.find( { classId: Session.get('classId'), type: Session.get('imageType') } );
  }
});

Template.images.events({
  'click #notesSubmit': function(event) {
    event.preventDefault();
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