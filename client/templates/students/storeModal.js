Template.storeModal.helpers({
  itemList: function() {
    return store.find({ classId: Session.get('classId') });
  }
});

Template.storeModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click #storeModalSubmit': function(event) {
    event.preventDefault();
    studentId=Session.get('studentId');
    coins = students.findOne({_id: studentId}).coins;
    $('.storeModal').find(".list-group-item-danger").each( function() {
      itemId=this.id;
      price=parseInt($(this).find(".price").text());
      if ( coins >= price ) {
        Meteor.call('buyingItem', Session.get('studentId'), itemId, price);
      } else {
        alert("No coins");
      }
    });
    Modal.hide('storeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('storeModal');
  }
});
