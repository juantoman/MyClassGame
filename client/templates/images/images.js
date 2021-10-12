$.getScript("https://media-library.cloudinary.com/global/all.js");
var last_image="";
var new_image="";

Template.imagesTemplate.onRendered(function() {
   $.getScript("https://upload-widget.cloudinary.com/global/all.js");
   key=mcgParameters.findOne({'_id':1}).GoogleApiKeyForCloudinary;
   //cloudName: 'myclassgame', 'c4mcg1', 'c4mcg2'
   //widget = cloudinary.createUploadWidget({ cloudName: 'myclassgame', uploadPreset: 'myclassgame', googleApiKey: key, cropping: true, croppingAspectRatio: 1, searchBySites: ["all", "cloudinary.com"], searchByRights: true}, function(error, result){
   widget = cloudinary.createUploadWidget({ cloudName: 'c4mcg1', uploadPreset: 'myclassgame', googleApiKey: key, searchBySites: ["all", "cloudinary.com"], searchByRights: true}, function(error, result){
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the image info: ', result.info);
      image_url=result.info.url;
      image_url=image_url.replace('http:','https:');
      if (Session.get('imageType')!="userAvatar") {
        if (Session.get('imageType')=="question") {
          var imgObject = {
             userId:Meteor.userId(),
             classId:Session.get('classId'),
             type: Session.get('imageType'),
             image_url: image_url,
             createdOn: new Date()
          };
        } else {
          var imgObject = {
             classId:Session.get('classId'),
             type: Session.get('imageType'),
             image_url: image_url,
             createdOn: new Date()
          };
        }
      } else {
        var imgObject = {
           userId:Meteor.userId(),
           type: Session.get('imageType'),
           image_url: image_url,
           createdOn: new Date()
        };
      }
      new_image=result.info.url;
      if (last_image!=new_image){
        Meteor.call('imageInsert',imgObject);
        last_image=new_image;
      }
    }
  });
});

Template.imagesTemplate.helpers({
  images: function() {
    if (Session.get('imageType')=="userAvatar") {
      return images.find( { userId: Meteor.userId(), type: Session.get('imageType') } );
    } else {
      return images.find( { classId: Session.get('classId'), type: Session.get('imageType') } );
    }
  },
  image_low: function() {
    cloudinary_url=this.image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/')
    return cloudinary_url;
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
    if ( Session.get('imageType') == "backImg" ) {
      idElement=classes.findOne({_id: Session.get('idElementImage')}).groupImg;
    }
    if ( Session.get('imageType') == "map" ) {
      idElement=classes.findOne({_id: Session.get('idElementImage')}).mapImg;
    }
    if ( Session.get('imageType') == "villains" ) {
      idElement=villains.findOne({_id: Session.get('idElementImage')}).villainImage;
    }
    if ( Session.get('imageType') == "mission" ) {
      idElement=challenges.findOne({_id: Session.get('idElementImage')}).missionImg;
    }
    if ( Session.get('imageType') == "behaviour" ) {
      idElement=behaviours.findOne({_id: Session.get('idElementImage')}).behaviourImage;
    }
    if ( Session.get('imageType') == "question" ) {
      idElement=questions.findOne({_id: Session.get('idElementImage')}).questionImage;
    }
    if (idImage==idElement) {
      return "checked";
    } else {
      return "";
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
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
      if (Session.get('imageType')=="villain") {
        Meteor.call('villainImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="mission") {
        Meteor.call('missionImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="group") {
        Meteor.call('groupImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        Meteor.call('groupImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="backImg") {
        Meteor.call('backImgUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
        $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
        $(".studentProfile").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
        $(".opacityDiv").toggleClass('opacityProfile');
      }
      if (Session.get('imageType')=="map") {
        Meteor.call('mapUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="userAvatar") {
        Meteor.call('userAvatarUpdate',$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="behaviour") {
        Meteor.call('behaviourImageUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
      if (Session.get('imageType')=="question") {
        Meteor.call('imageQuestionUpdate',Session.get('idElementImage'),$("input[name='imageId']:checked").val());
      }
    } else {
      Session.set('selectedImage',$("input[name='imageId']:checked").val());
    }
    Meteor.call('studentCanChangeImage', Session.get('studentId'),false);
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
    swal({
      title: TAPi18n.__('delete') + " " + TAPi18n.__('image'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('imageDelete',this._id);
        swal({
          title: TAPi18n.__('image') + " " + TAPi18n.__('fdeleted'),
          type: 'success'
        })
      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .thumbnail,.card_image': function(event) {
    event.preventDefault();
    $(".thumbnail,.card_image").removeClass("checked");
    $(event.currentTarget).find("input").prop("checked", true);
    $(event.currentTarget).addClass("checked");
  },
  'click .delcloud': function(event) {
    event.preventDefault();
    
    var cloudinary = require("cloudinary-core");

    var cl = new cloudinary.Cloudinary({cloud_name: "c4mcg1", secure: true});

    // Change cloud name, API Key, and API Secret below

    cl.config({ 
      cloud_name: 'c4mcg1', 
      api_key: '411178996743237', 
      api_secret: '2jLtsfPQfVrXtm63v5M-93Ek_cw' 
    });

    // // Change 'sample' to any public ID of your choice

    cl.v2.uploader.upload("https://res.cloudinary.com/c4mcg1/image/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/v1634072191/myclassgame/PP_icono_2019_gcz9cd.svg", function(error, result) {console.log(result, error); });
  }
});
