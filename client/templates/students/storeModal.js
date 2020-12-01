Template.storeModal.rendered = function() {
  Session.set('wonCoins', 0);
  Session.set('spentCoins', 0);
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
  },
  itemDisabled: function() {
    s=students.findOne({_id: Session.get('studentId')});
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    if (xpChecked) {
      levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      l=parseInt(s.XP/levelXP);
    } else {
      l=parseInt(s.level);
    }
    if ( l < this.itemLevel ) {
      return "disabled";
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
