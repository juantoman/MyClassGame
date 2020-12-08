Template.storeModal.rendered = function() {
  c=students.findOne( { _id : Session.get("studentId") } ).coins;
  Session.set('maxCoins', c);
  Session.set('spentCoins', 0);
  $(".storeModal").find(".itemEnabled").each( function() {
    price=$(this).find(".badge").text();
    if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
      $(this).prop('disabled', true);
    } else {
      $(this).prop('disabled', false);
    }
  })
}

Template.storeModal.helpers({
  itemList: function() {
    return store.find({ classId: Session.get('classId') });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  coins: function() {
    return students.findOne({_id: Session.get('studentId') }).coins;
  },
  wonCoins: function() {
    return Session.get('maxCoins');
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
  },
  itemDisabled: function() {
    if ( students.findOne( { _id : Session.get("studentId") } ).level < this.itemLevel ) {
      return true;
    }
  },
});

Template.storeModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("list-group-item-danger");
    coins=parseInt($(event.currentTarget).find(".price").text());
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      Session.set('spentCoins', Session.get('spentCoins') + coins);
    } else {
      Session.set('spentCoins', Session.get('spentCoins') - coins);
    }
    $(".storeModal").find(".itemEnabled").each( function() {
      price=$(this).find(".badge").text();
      if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
        $(this).prop('disabled', true);
      } else {
        $(this).prop('disabled', false);
      }
    })
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
    price=0;
    $('.storeModal').find(".list-item-selected").each( function() {
      price+=parseInt($(this).find(".price").text());
    });
    if ( coins >= price ) {
      $('.storeModal').find(".list-group-item-danger").each( function() {
        itemId=this.id;
        price=parseInt($(this).find(".price").text());
        Meteor.call('buyingItem', Session.get('studentId'), itemId, price);
      });
    } else {
      swal({
        title: TAPi18n.__('noMoney'),
        text: TAPi18n.__('workHard'),
        icon: "warning",
      });
    }
    Modal.hide('storeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('storeModal');
  }
});
