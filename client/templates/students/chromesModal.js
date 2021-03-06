Template.chromesModal.rendered = function() {
  c=students.findOne( { _id : Session.get("studentId") } ).coins;
  Session.set('maxCoins', c);
  Session.set('spentCoins', 0);
  $(".chromesModal").find(".itemEnabled").each( function() {
    price=$(this).find(".badge").text();
    if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
      $(this).prop('disabled', true);
    } else {
      $(this).prop('disabled', false);
    }
  })
}

Template.chromesModal.helpers({
  cards: function() {
    return cards.find({classId: Session.get('classId')});
  },
  chromes: function() {
    return chromes.find({classId: Session.get('classId')}, { sort : { chromeLevel : 1 } });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
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
  },
  chromeDisabled: function() {
      if ( students.findOne( { _id : Session.get("studentId") } ).level < this.chromeLevel ) {
        return true;
      }
  },
  // chromeDisabled: function() {
  //   s=students.findOne({_id: Session.get('studentId')});
  //   xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
  //   if (xpChecked) {
  //     levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
  //     l=parseInt(s.XP/levelXP);
  //   } else {
  //     l=parseInt(s.level);
  //   }
  //   if ( l < this.chromeLevel ) {
  //     return "disabled";
  //   }
  // },
  cardDisabled: function() {
    s=students.findOne({_id: Session.get('studentId')});
    xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    // if (xpChecked) {
    //   levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
    //   l=parseInt(s.XP/levelXP);
    // } else {
    //   l=parseInt(s.level);
    // }
    l=parseInt(s.level);
    if ( l < this.cardLevel ) {
      return "disabled";
    }
  },
  coins: function() {
    return students.findOne({_id: Session.get('studentId') }).coins;
  },
  spentCoins: function() {
    return Session.get('spentCoins');
  }
});

Template.chromesModal.events({
  'click #chromesModalSubmit': function(event) {
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
    // l=0;
    // s=students.findOne({_id: Session.get('studentId')}).level;
    // xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    // if (xpChecked) {
    //   levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
    //   l=parseInt(s.XP/levelXP);
    // } else {
    //   l=parseInt(s.level);
    // }
    if ( Session.get('spentCoins') > students.findOne({_id: Session.get('studentId') }).coins ){
      swal({
        title: TAPi18n.__('noMoney'),
        type: 'warning'
      })
    } else {
      $('.chromesModal').find(".list-group-item-danger").each( function(i) {
        chromeId=this.getAttribute('data-chromeId');
        c=chromes.findOne({_id: chromeId});
        Meteor.call('studentChrome', Session.get('studentId'), chromeId);
        Meteor.call('incCoins', Session.get('studentId'), -parseInt(c.chromePrice));
        swal({
          title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('added'),
          type: 'success'
        })
        // if (c.chromeLevel > l ) {
        //   swal({
        //     title: TAPi18n.__('lowLevel'),
        //     type: 'warning'
        //   })
        // } else if ( c.chromePrice > s.coins ) {
        //   swal({
        //     title: TAPi18n.__('noMoney'),
        //     type: 'warning'
        //   })
        // } else {
        //   swal({
        //     title: TAPi18n.__('add') + " " +  TAPi18n.__('collectionable'),
        //     text: TAPi18n.__('areYouSure'),
        //     type: 'warning',
        //     showCancelButton: true,
        //     confirmButtonText: TAPi18n.__('yes'),
        //     cancelButtonText: 'No'
        //   }).then((result) => {
        //     if (result.value) {
        //         //
        //         // Meteor.call('studentChrome', Session.get('studentId'), chromeId);
        //         // Meteor.call('incCoins', Session.get('studentId'), -parseInt(c.chromePrice));
        //         // Meteor.call('studentBadge', Session.get('studentId'), this._id);
        //         // Meteor.call('studentXP', Session.get('studentId'), parseInt(this.points));
        //       swal({
        //         title: TAPi18n.__('collectionable') + " " +  TAPi18n.__('added'),
        //         type: 'success'
        //       })
        //     // result.dismiss can be 'overlay',e 'cancel', 'close', 'esc', 'timer'
        //     }
        //   })
        // }
        //Meteor.call('studentChrome', Session.get('studentId'), chromeId);
        //   if (students.find({'_id':Session.get('studentId'),'chromes.chromeId':chromeId}).count() != 1 ) {
        //     Meteor.call('studentChrome', Session.get('studentId'), chromeId);
        //   }
        // } else {
        //   Meteor.call('studentChromePull', Session.get('studentId'), chromeId);
        // }
      });
    }
    Modal.hide('cardsModal');
  },
  'click .chromesModal .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
      Session.set('spentCoins', Session.get('spentCoins')-parseInt(this.chromePrice));
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
      Session.set('spentCoins', Session.get('spentCoins')+parseInt(this.chromePrice));
    }
    $(".chromesModal").find(".itemEnabled").each( function() {
      price=$(this).find(".badge").text();
      if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
        $(this).prop('disabled', true);
      } else {
        $(this).prop('disabled', false);
      }
    })
  }/*,
  'click .cardsModal .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
      Session.set('spentCoins', Session.get('spentCoins')-parseInt(this.cardPrice));
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
      Session.set('spentCoins', Session.get('spentCoins')+parseInt(this.cardPrice));
    }
  }*/
});
