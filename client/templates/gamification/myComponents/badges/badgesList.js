Template.badgesList.helpers({
  badgesList: function() {
    return badges.find({classId: Session.get('classId')});
  },
  badge_src: function(imageId) {
    if (imageId) {
      return images.findOne({_id: imageId}).image_url;
    } else {
      if (Session.get('selectedImage')) {
        return images.findOne({_id: Session.get('selectedImage')}).image_url;
      } else {
        return "https://res.cloudinary.com/myclassgame/image/upload/v1542714723/myclassgame/Gold_Badge_Template_Clipart_Picture_ohwmt7.png";
      }
    }
  }
});

Template.badgesList.events({
  'submit form.createBadgeForm': function(event) {
    event.preventDefault();
    var badge = {
      classId: Session.get('classId'),
      badgeName: $(event.target).find('[name=badgeName]').val(),
      badgeDescription: $(event.target).find('[name=badgeDescription]').val(),
      points: $(event.target).find('[name=badgePoints]').val(),
      level: $(event.target).find('[name=badgeLevel]').val(),
      badgeImage: Session.get('selectedImage'),
      createdOn: new Date()
    };
    Meteor.call('badgeInsert', badge);
  },
  'submit form.badgeForm': function(event) {
    event.preventDefault();
    var badge = {
      badgeName: $(event.target).find('[name=badgeName]').val(),
      badgeDescription: $(event.target).find('[name=badgeDescription]').val(),
      points: $(event.target).find('[name=badgePoints]').val(),
      level: $(event.target).find('[name=badgeLevel]').val(),
      badgeImage: Session.get('selectedImage')
    };
    Meteor.call('badgeUpdate', this._id, badge);
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
  'click .btnDeleteBadge': function(event) {
    event.preventDefault();
    Meteor.call('badgeDelete',this._id);
  },
  'click .bImage': function(event) {
    event.preventDefault();
    Session.set('imageType','badge');
    Session.set('idElementImage',event.currentTarget.id);
    Modal.show('imagesTemplate');
  }
});
