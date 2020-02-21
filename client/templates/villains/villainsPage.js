Template.villainsPage.helpers({
  villains: function() {
    return villains.find();
  },
  image: function() {
    return images.findOne({_id: this.villainImage}).image_url;
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
       title: 'Eliminar villano',
       text: '¿Estás seguro de querer eliminar este villano?',
       type: 'warning',
       showCancelButton: true,
       confirmButtonText: 'Sí',
       cancelButtonText: 'No'
     }).then((result) => {
       if (result.value) {
         Meteor.call('villainDelete', this._id);
         swal({
           title: 'Villano eliminado!',
           type: 'success'
         })
       // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
       }
     })

   }
})
