Template.coinsModal.rendered = function() {
  Session.set('wonCoins', 0);
  Session.set('spentCoins', 0);
}

Template.coinsModal.helpers({
  // itemList: function() {
  //   return store.find({ classId: Session.get('classId') });
  // },
  // srcImage: function(imgId) {
  //   cloudinary_url=images.findOne({_id: imgId }).image_url;
  //   cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
  //   return cloudinary_url;
  // },
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

Template.coinsModal.events({
  // 'click .list-group-item': function(event) {
  //   event.preventDefault();
  //   $(event.currentTarget).toggleClass("list-item-selected");
  //   coins=parseInt($(event.currentTarget).find(".price").text());
  //   if ($(event.currentTarget).hasClass("list-item-selected")){
  //     Session.set('spentCoins', Session.get('spentCoins') + coins);
  //   } else {
  //     Session.set('spentCoins', Session.get('spentCoins') - coins);
  //   }
  // },
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
    coins=parseInt($(event.currentTarget).find(".badge").text());
    win=$("#WinOrLose").is(":checked");
    if ($(event.currentTarget).hasClass("activeTask")) {
      if (win) {
        Session.set('wonCoins', Session.get('wonCoins') + coins);
      } else {
        Session.set('spentCoins', Session.get('spentCoins') + coins);
      }
    } else {
      if (win) {
        Session.set('wonCoins', Session.get('wonCoins') - coins);
      } else {
        Session.set('spentCoins', Session.get('spentCoins') - coins);
      }
    }
  },
  'click #WinOrLose': function(event) {

    win=$(event.target).is(":checked");

    if (win) {
      Session.set('wonCoins', Session.get('spentCoins'));
      Session.set('spentCoins',0);
    } else {
      Session.set('spentCoins', Session.get('wonCoins'));
      Session.set('wonCoins', 0);
    }
  },
  'click #storeModalSubmit': function(event) {
    event.preventDefault();
    studentId=Session.get('studentId');
    $('.coinsModal').find(".activeTask").each( function() {
      coins=parseInt($(this).find(".badge").text());
      win=$("#WinOrLose").is(":checked");
      if (win) {
        Meteor.call('incCoins', Session.get('studentId'), coins);
      } else {
        Meteor.call('incCoins', Session.get('studentId'), -coins);
      }
    });
    // coins = students.findOne({_id: studentId}).coins;
    // $('.storeModal').find(".list-item-selected").each( function() {
    //   itemId=this.id;
    //   price=parseInt($(this).find(".price").text());
    //   if ( coins >= price ) {
    //     Meteor.call('buyingItem', Session.get('studentId'), itemId, price);
    //   } else {
    //     swal({
    //       title: TAPi18n.__('noMoney'),
    //       text: TAPi18n.__('workHard'),
    //       icon: "warning",
    //     });
    //   }
    // });
    Modal.hide('coinsModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('coinsModal');
  }
});
