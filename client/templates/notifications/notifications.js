Template.notifications.helpers({
  notiCards: function() {
    return notifications.find({classId: Session.get('classId'),'elementType':'card'});
  },
  notiItem: function() {
    return notifications.find({classId: Session.get('classId'),'elementType':'item'});
  },
  student: function(){
    return students.findOne({_id: this.studentId});
  },
  card: function(){
    return cards.findOne({_id: this.elementId});
  },
  item: function(){
    return store.findOne({_id: this.elementId});
  },
  element_src: function(imageId) {
    if (imageId) {
      cloudinary_url=images.findOne({_id: imageId}).image_url;
      cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
      return cloudinary_url;
    } else {
      if (Session.get('selectedImage')) {
        cloudinary_url=images.findOne({_id: Session.get('selectedImage')}).image_url;
        cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_100,f_auto,dpr_auto/')
        return cloudinary_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/q_auto,w_auto,h_60,f_auto,dpr_auto/v1542714723/myclassgame/Gold_Badge_Template_Clipart_Picture_ohwmt7.png";
      }
    }
  }
});

Template.notifications.events({
 'click .validarCard': function(event) {
    event.preventDefault();
    if ( !this.used ) {
      swal({
        title: TAPi18n.__('use') + " " + TAPi18n.__('power'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Meteor.call('studentUseCard', this.studentId, this.elementId);
          Meteor.call('usedCard', this._id);
          swal({
            title: TAPi18n.__('canUse') + " " + TAPi18n.__('power'),
            type: 'success'
          })
        // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
  },
  'click .validarItem': function(event) {
    event.preventDefault();
    if ( !this.used ) {
      swal({
        title: TAPi18n.__('use') + " " + TAPi18n.__('item'),
        text: TAPi18n.__('areYouSure'),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: TAPi18n.__('yes'),
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          Meteor.call('studentUseItem', this.studentId, this.elementId);
          Meteor.call('usedItem', this._id);
          swal({
            title: TAPi18n.__('canUse') + " " + TAPi18n.__('item'),
            type: 'success'
          })
        // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        }
      })
    }
  },
  'click .notification-remove': function(event) {
    event.preventDefault();
    swal({
      title: TAPi18n.__('remove') + " " + TAPi18n.__('notification'),
      text: TAPi18n.__('areYouSure'),
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: TAPi18n.__('yes'),
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('notificationRemove', this._id);
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  }
});
