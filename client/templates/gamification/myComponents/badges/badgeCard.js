Template.badgeCard.helpers({
  badge_src: function(imageId) {
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/');
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/');
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/v1554810211/images/event-2930674_960_720.png";
      }
    }
  }
});

Template.badgeCard.events({
 'click img, click .glyphicon': function(event) {
    event.preventDefault();
    Session.set('imageType','badge');
    Session.set('idElementImage',this._id);
    Modal.show('imagesTemplate');
  },
  'click .btnUrlBadge': function(event) {
    event.preventDefault();
    const el = document.createElement('textarea');
    //el.value = "https://www.myclassgame.es/mcgapi/mcgapi.html?e=badge&id="+this._id;
    el.value = '<div style="width: 100%;"><div style="position: relative; padding-bottom: 56.25%; padding-top: 0; height: 0;"><iframe frameborder="0" width="1200" height="675" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.myclassgame.es/mcgapi/badgeAPI.html?e=badge&amp;id='+ this._id +'" type="text/html" allowfullscreen="true" scrolling="yes"></iframe></div></div>'
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
});
