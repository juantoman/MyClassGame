Template.cardsModal.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  srcImage: function(imgId) {
    return images.findOne({_id: imgId }).image_url;
  },
  cardIn: function(cardId) {
    list=""
    students.findOne({'_id':Session.get('studentId')}).cards.forEach(function(c){
      if (c.cardId == cardId ) {
        list="list-group-item-danger"
      }
    });
    return list;
  }
});

Template.cardsModal.events({
  'click #cardModalSubmit': function(event) {
    event.preventDefault();
    $('.cardsModal').find(".list-group-item-danger").each( function() {
      cardId=this.id;
      if (students.findOne({'_id':Session.get('studentId')}).cards==undefined){
        Meteor.call('studentCard', Session.get('studentId'), cardId);
      } else {
        found=false;
        students.findOne({'_id':Session.get('studentId')}).cards.forEach(function(c){
          if (c.cardId == cardId ) {
            found=true;
          }
        });
        if (!found){
          Meteor.call('studentCard', Session.get('studentId'), cardId);
        }
      }
    });
    Modal.hide('cardsModal');
  },
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  }
});
