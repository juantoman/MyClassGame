Template.villainsPage.helpers({
  villains: function() {
    return villains.find();
  },
  image: function() {
    if (this.villainImage.substring(0, 4)=="http" || this.villainImage.substring(0, 1)=="/") {
      return this.villainImage;
    } else {
      cloudinary_url=images.findOne({_id: this.villainImage}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_180,f_auto,dpr_auto/');
      return cloudinary_url;
    }
  }
})

Template.villainsPage.events({
  'click .newVillain': function() {
    Modal.show('addVillainModal');
  },
  'change .villainCard .villainName': function(event) {
    Meteor.call('villainNameUpdate', this._id, $(event.currentTarget).val());
  },
  'change .villainCard .villainHP': function(event) {
    Meteor.call('villainHPUpdate', this._id, $(event.currentTarget).val());
  },
  'click .villainImage': function(event) {
     event.preventDefault();
     Session.set('imageType','villain');
     Session.set('idElementImage',this._id);
     if (Session.get('userType')=="teacher") {
       Modal.show('imagesTemplate');
     }
   },
   'click .cardLogo': function(event) {
      event.preventDefault();
      Session.set('imageType','villain');
      Session.set('idElementImage',this._id);
      if (Session.get('userType')=="teacher") {
        Modal.show('imagesTemplate');
      }
    },
   'click .villainCard .cardDelete': function() {
     swal({
       title: TAPi18n.__('delete') + " " + TAPi18n.__('villain'),
       text: TAPi18n.__('areYouSure'),
       type: 'warning',
       showCancelButton: true,
       confirmButtonText: TAPi18n.__('yes'),
       cancelButtonText: 'No'
     }).then((result) => {
       if (result.value) {
         Meteor.call('villainDelete', this._id);
         swal({
           title: TAPi18n.__('villain') + " " + TAPi18n.__('deleted'),
           type: 'success'
         })
       // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
       }
     })

   }
})
