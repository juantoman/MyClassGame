Template.visibleClasses.helpers({
    visibleClasses: function() {
      return classes.find( { "visibleClass": true });
    },
    classImage: function() {
      avatar=this.groupImg;
      if (avatar) {
        if (avatar.substring(0, 4)=="http") {
          return avatar;
        } else {
          cloudinary_url=images.findOne({_id: avatar}).image_url;
          cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/')
          return cloudinary_url;
        }
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/v1543412151/proves/grupo.png";
      }
    }
  });

  Template.visibleClasses.events({
    'click .btn-visibleClass': function(event) {
        if ( location.host == 'localhost:8000' ) {
            location.href = 'http://localhost:8000/view/'+this._id;
        }
        if (location.origin == 'https://www.myclassgame.es') {
            location.href = 'https://www.myclassgame.es/view/'+this._id;
        }
    }
  });