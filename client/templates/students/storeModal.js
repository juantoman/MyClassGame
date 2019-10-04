Template.storeModal.rendered = function() {
  Session.set('wonCoins', 0);
  Session.set('spentCoins', 0);
}

Template.storeModal.helpers({
  itemList: function() {
    return store.find({ classId: Session.get('classId') });
  },
  srcImage: function(imgId) {
    return images.findOne({_id: imgId }).image_url;
  },
  coins: function() {
    return students.findOne({_id: Session.get('studentId') }).coins;
  },
  wonCoins: function() {
    return Session.get('wonCoins');
  },
  spentCoins: function() {
    return Session.get('spentCoins');
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});

Template.storeModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("list-item-selected");
    coins=parseInt($(event.currentTarget).find(".price").text());
    if ($(event.currentTarget).hasClass("list-item-selected")){
      Session.set('spentCoins', Session.get('spentCoins') + coins);
    } else {
      Session.set('spentCoins', Session.get('spentCoins') - coins);
    }
  },
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
    coins=parseInt($(event.currentTarget).find(".badge").text());
    if ($(event.currentTarget).hasClass("activeTask")) {
      Session.set('wonCoins', Session.get('wonCoins') + coins);
    } else {
      Session.set('wonCoins', Session.get('wonCoins') - coins);
    }
  },
  'click #storeModalSubmit': function(event) {
    event.preventDefault();
    studentId=Session.get('studentId');
    $('.storeModal').find(".activeTask").each( function() {
      coins=parseInt($(this).find(".badge").text());
      Meteor.call('incCoins', Session.get('studentId'), coins);
    });
    coins = students.findOne({_id: studentId}).coins;
    $('.storeModal').find(".list-item-selected").each( function() {
      itemId=this.id;
      price=parseInt($(this).find(".price").text());
      if ( coins >= price ) {
        Meteor.call('buyingItem', Session.get('studentId'), itemId, price);
      } else {
        swal({
          title: "¡No tienes bastantes monedas!",
          text: "¡Esfuérzate para conseguirlas y así poder comprar artículos en la tienda!",
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
