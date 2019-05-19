Template.imagesTemplate.onRendered(function() {
   $.getScript("https://media-library.cloudinary.com/global/all.js");
   widget = cloudinary.createUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame',  googleApiKey: 'AIzaSyBqyxpnFhDv1nOkTszttyDSXn2HPpznhZI'}, function(error, result){
    if (!error && result && result.event === "success") { 
      console.log('Done! Here is the image info: ', result.info); 
      var imgObject = {
         classId:Session.get('classId'),
         type: Session.get('imageType'),
         image_url: result.info.url,
         createdOn: new Date()
      };
      Meteor.call('imageInsert',imgObject);
    }
  });
});

Template.imagesTemplate.helpers({
  images: function() {
    return images.find( { classId: Session.get('classId'), type: Session.get('imageType') } );
  },
  checkedImage: function(idImage) {
    if ( Session.get('imageType') == "badge" ) {
      idElement=badges.findOne({_id: Session.get('idElementImage')}).badgeImage;
    }
    if ( Session.get('imageType') == "event" ) {
      idElement=randomEvents.findOne({_id: Session.get('idElementImage')}).eventImage;
    }
    if ( Session.get('imageType') == "card" ) {
      idElement=cards.findOne({_id: Session.get('idElementImage')}).cardImage;
    }
    if ( Session.get('imageType') == "chrome" ) {
      idElement=chromes.findOne({_id: Session.get('idElementImage')}).chromeImage;
    }
    if ( Session.get('imageType') == "item" ) {
      idElement=store.findOne({_id: Session.get('idElementImage')}).itemImage;
    }
    if ( Session.get('imageType') == "avatar" ) {
      if (students.find({_id: Session.get('idElementImage')}).count()!=0) {
        idElement=students.findOne({_id: Session.get('idElementImage')}).avatar;
      } else {
        idElement=classes.findOne({_id: Session.get('idElementImage')}).studentImg;
      }
    }
    if ( Session.get('imageType') == "group" ) {
      if (groups.find({_id: Session.get('idElementImage')}).count()!=0) {
        idElement=groups.findOne({_id: Session.get('idElementImage')}).groupImg;
      } else {
        idElement=classes.findOne({_id: Session.get('idElementImage')}).groupImg;
      }
    }
    if (idImage==idElement) {
      return "checked";
    } else {
      return "";
    }
  }
});

Template.imagesTemplate.events({
  'click .selectImage': function(event) {
    event.preventDefault();
    if (Session.get('idElementImage')){
      if (Session.get('imageType')=="badge") {
        Meteor.call('imageBadgeUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="event") {
        Meteor.call('imageEventUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="card") {
        Meteor.call('imageCardUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="chrome") {
        Meteor.call('imageChromeUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="item") {
        Meteor.call('imageItemUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="avatar") {
        Meteor.call('avatarUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        Meteor.call('studentImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="group") {
        Meteor.call('groupImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        Meteor.call('groupImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
    } else {
      Session.set('selectedImage',$("input[name='imageId']:checked").val());
    }
    Modal.hide('imagesTemplate');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('imagesTemplate');
  },
  'click .cloudinary': function(event) {
    event.preventDefault();
    widget.open();
  },
  'click .deleteImage': function(event) {
    event.preventDefault();
    Meteor.call('imageDelete',this._id);
  }
});