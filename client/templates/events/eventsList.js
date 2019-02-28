Template.eventsList.helpers({
  randomEvents: function() {
    return randomEvents.find({classId: Session.get('classId')});
  },
  event_src: function(imageId) {
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

Template.eventsList.events({
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var randomEvent = {
      classId: Session.get('classId'),
      eventName: $(event.target).find('[name=eventName]').val(),
      eventDescription: $(event.target).find('[name=eventDescription]').val(),
      eventImage: Session.get('selectedImage'),
      createdOn: new Date()
    };
    Meteor.call('randomEventInsert', randomEvent);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('randomEventUpdate', event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('randomEventDelete',event.target.id);
    }
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','event');
    Session.set('idElementImage',event.currentTarget.id);
    Modal.show('images');
  }
});
