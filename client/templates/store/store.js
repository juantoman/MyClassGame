Template.store.helpers({
  store: function() {
    return store.find({classId: Session.get('classId')});
  },
  item_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1554809836/images/design-2381160_960_720.png";
      }
    }
  }
});

Template.store.events({
  'submit form': function(event) {
    event.preventDefault();
    var item = {
      classId: Session.get('classId'),
      itemName: $(event.target).find('[name=itemName]').val(),
      itemDescription: $(event.target).find('[name=itemDescription]').val(),
      itemLevel: $(event.target).find('[name=itemLevel]').val(),
      price: $(event.target).find('[name=itemPrice]').val(),
      createdOn: new Date()
    };
    Meteor.call('itemInsert', item);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    switch(event.target.id) {
      case "itemName":
        Meteor.call('itemUpdateName', event.target.name, event.currentTarget.value);
        break;
      case "itemDescription":
        Meteor.call('itemUpdateDesc', event.target.name, event.currentTarget.value);
        break;
      case "itemPrice":
        Meteor.call('itemUpdatePrice', event.target.name, event.currentTarget.value);
    } 
    if (!event.currentTarget.value ) {
      Meteor.call('itemDelete',event.target.name);
    }
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','item');
    Session.set('idElementImage',event.currentTarget.title);
    Modal.show('imagesTemplate');
  }
});
