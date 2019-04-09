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
        return "https://res.cloudinary.com/myclassgame/image/upload/v1554810211/images/event-2930674_960_720.png";
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
      Meteor.call('randomEventUpdate', event.target.name, event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('randomEventDelete',event.target.name);
    }
  },
 'click .eImage': function(event) {
    event.preventDefault();
    Session.set('imageType','event');
    Session.set('idElementImage',event.currentTarget.title);
    Modal.show('images');
  }
});
