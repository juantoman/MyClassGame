Template.notifications.helpers({
  notifications: function() {
    return notifications.find({classId: Session.get('classId'),'used':false});
  },
  usedCards: function() {
    return notifications.find({classId: Session.get('classId'),'used':true});
  },
  student: function(){
    return students.findOne({_id: this.studentId});
  },
  card: function(){
    return cards.findOne({_id: this.cardId});
  },
  card_src: function(imageId) {
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
  'submit form': function(event) {
    event.preventDefault();
    //console.log($(event.target).find('[name=eventDescription]').val())
    var card = {
      classId: Session.get('classId'),
      cardName: $(event.target).find('[name=cardName]').val(),
      cardDescription: $(event.target).find('[name=cardDescription]').val(),
      cardImage: Session.get('selectedImage'),
      createdOn: new Date()
    };
    Meteor.call('cardInsert', card);
  },
  'change .inputGroup': function(event) {
    event.preventDefault();
    if (event.currentTarget.value )
    {
      Meteor.call('cardUpdate', event.target.name, event.target.id, event.currentTarget.value);
    } else {
      Meteor.call('cardDelete',event.target.name);
    }
  },
 'click .validar': function(event) {
    event.preventDefault();
    Meteor.call('studentUseCard', this.studentId, this.cardId);
    Meteor.call('usedCard', this._id);
  }
});
