Template.badgesList.helpers({
  badgesList: function() {
    return badges.find({classId: Session.get('classId')});
  },
  badge_src: function(imageId) {
    return images.findOne({_id: imageId}).image_url;
  }
});

Template.badgesList.events({
  'submit form': function(event) {
    event.preventDefault();
    var badge = {
      classId: Session.get('classId'),
      badgeDescription: $(event.target).find('[name=badgeDescription]').val(),
      points: $(event.target).find('[name=badgePoints]').val(),
      level: $(event.target).find('[name=badgeLevel]').val(),
      badgeImage: "http://res.cloudinary.com/myclassgame/image/upload/v1542367714/myclassgame/S01-570_sjzmdg.jpg",
      createdOn: new Date()
    };
    Meteor.call('badgeInsert', badge);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      if (event.target.id=="inputDesc")
      {
        Meteor.call('badgeUpdateDesc', event.target.name, event.currentTarget.value);
      }
      if (event.target.id=="inputPoints")
      {
        Meteor.call('badgeUpdatePoints', event.target.name, event.currentTarget.value);
      }
      if (event.target.id=="inputLevel")
      {
        Meteor.call('badgeUpdateLevel', event.target.name, event.currentTarget.value);
      }
    } else {
      Meteor.call('badgeDelete',event.target.name);
    }
  },
 'click .badgeImage': function(event) {
    event.preventDefault();
    Session.set('imageType','badge');
    Modal.show('images');
  }
});
