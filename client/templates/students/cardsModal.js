Template.cardsModal.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  chromes: function() {
    return chromes.find({classId: Session.get('classId')});
  },
  srcImage: function(imgId) {
    return images.findOne({_id: imgId }).image_url;
  },
  cardIn: function(cardId) {
    list=""
    //console.log(students.find({'_id':Session.get('studentId'),'cards.cardId':cardId}).count());
    //students.findOne({'_id':Session.get('studentId')}).cards.forEach(function(c){
      if (students.find({'_id':Session.get('studentId'),'cards.cardId':cardId}).count() == 1 ) {
        list="list-group-item-danger"
      }
    //});
    return list;
  },
  chromeIn: function(chromeId) {
    list=""
    //console.log(students.find({'_id':Session.get('studentId'),'cards.cardId':cardId}).count());
    //students.findOne({'_id':Session.get('studentId')}).cards.forEach(function(c){
      if (students.find({'_id':Session.get('studentId'),'chromes.chromeId':chromeId}).count() == 1 ) {
        list="list-group-item-danger"
      }
    //});
    return list;
  }
});

Template.cardsModal.events({
  'click #cardModalSubmit': function(event) {
    event.preventDefault();
    $('.cardsModal').find(".list-group-item").each( function() {
      cardId=this.id;
      if ($(this).hasClass("list-group-item-danger")) {
        if (students.find({'_id':Session.get('studentId'),'cards.cardId':cardId}).count() != 1 ) {
          Meteor.call('studentCard', Session.get('studentId'), cardId);
        }
      } else {
        Meteor.call('studentCardPull', Session.get('studentId'), cardId);
      }
    });
    $('.chromesModal').find(".list-group-item").each( function() {
      chromeId=this.id;
      if ($(this).hasClass("list-group-item-danger")) {
        if (students.find({'_id':Session.get('studentId'),'chromes.chromeId':chromeId}).count() != 1 ) {
          Meteor.call('studentChrome', Session.get('studentId'), chromeId);
        }
      } else {
        Meteor.call('studentChromePull', Session.get('studentId'), chromeId);
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
