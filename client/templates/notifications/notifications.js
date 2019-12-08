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
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "http://res.cloudinary.com/myclassgame/image/upload/v1542714723/myclassgame/Gold_Badge_Template_Clipart_Picture_ohwmt7.png";
      }
    }
  }
});

Template.notifications.events({
 'click .validarCard': function(event) {
    event.preventDefault();
    swal({
      title: 'Usar carta',
      text: '¿Estás seguro de querer validar el uso de esta carta?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentUseCard', this.studentId, this.elementId);
        Meteor.call('usedCard', this._id);
        swal({
          title: '¡Ya se puede usar esta carta!',
          type: 'success'
        })
      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      }
    })
  },
  'click .validarItem': function(event) {
    event.preventDefault();
    swal({
      title: 'Usar artículo',
      text: '¿Estás seguro de querer validar el uso de este artículo?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        Meteor.call('studentUseItem', this.studentId, this.elementId);
        Meteor.call('usedItem', this._id);
        swal({
          title: '¡Ya se puede usar este artículo!',
          type: 'success'
        })
      // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
      }
    })
  }
});
