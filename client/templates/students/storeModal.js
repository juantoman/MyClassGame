Template.storeModal.helpers({
  itemList: function() {
    return store.find({ classId: Session.get('classId') });
  },
  srcImage: function(imgId) {
    return images.findOne({_id: imgId }).image_url;
  },
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
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
  },
  'click #storeModalSubmit': function(event) {
    event.preventDefault();
    studentId=Session.get('studentId');
    coins = students.findOne({_id: studentId}).coins;
    $('.storeModal').find(".activeTask").each( function() {
      coins=parseInt($(this).find(".badge").text());
      Meteor.call('incCoins', Session.get('studentId'), coins);
    });
    $('.storeModal').find(".list-group-item-danger").each( function() {
      itemId=this.id;
      price=parseInt($(this).find(".price").text());
      if ( coins >= price ) {
        Meteor.call('buyingItem', Session.get('studentId'), itemId, price);
      } else {
        swal({
          title: "¡No tienes bastantes monedas!",
          text: "¡Esfuérzate para conseguirlas y así poder comprar!",
          icon: "warning",
        });
      }
    });
    Modal.hide('storeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('storeModal');
  }
});
