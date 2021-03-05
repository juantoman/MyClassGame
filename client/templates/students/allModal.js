Template.allModal.helpers({
  students: function() {
    return students.find( { $or: [ { groupId: Session.get('groupId') }, { $and: [ { groupId: 0 } , { classId: Session.get('classId')  } ] } ] } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  groupName: function() {
    return groups.findOne( { _id: Session.get('groupId') }).groupName;
  }
});

Template.allModal.events({
  'submit form#add_student_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var student = {
      classId: Session.get('classId'),
      studentName: $(event.target).find('[name=student-name]').val(),
      groupId: 0,
      createdOn: new Date()
    };
    Meteor.call('studentInsert', student);
    $('#add_student_modal').modal('hide');
  },
  'submit form#add_group_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var group = {
      classId: Session.get('classId'),
      groupName: $(event.target).find('[name=group-name]').val(),
      createdOn: new Date()
    };
    Meteor.call('groupInsert', group);
    $('#add_group_modal').modal('hide');
  },
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click #hpModalSubmit': function(event) {
    event.preventDefault();
    $('#hp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        behaviourType: 'HP',
        evaluation: Session.get('evaluation'),
        comment: $("#commentHP").val(),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentHP', Session.get('studentId'), p);
    });
    $('#hp_modal').modal('hide');
  },
  'click #xpModalSubmit': function(event) {
    event.preventDefault();
    $('#xp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        behaviourType: 'XP',
        evaluation: Session.get('evaluation'),
        comment: $("#commentXP").val(),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    $('#xp_modal').modal('hide');
  },
  'click #groupModalSubmit': function(event) {
    event.preventDefault();
    $('.modal').find(".list-group-item").each( function() {
      i=this.id;
      Meteor.call('studentGroup', 0, i);
    });
    $('.modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      Meteor.call('studentGroup', Session.get('groupId'), i);
    });
    gName=$("#gName").val();
    Meteor.call('groupModify', Session.get('groupId'), gName);
    Modal.hide('groupModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('groupModal');
  }
});

Template.allXPModal.rendered = function() {
  Session.set('addedXP', 0);
}

Template.allXPModal.helpers({
  xps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: true });
  },
  hps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: false });
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  addedXP: function() {
    return Session.get('addedXP');
  }
});

Template.allXPModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('groupXPModal');
  },
  'click #xpModalSubmit': function(event) {
    event.preventDefault();
    $('#all_xp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      console.log("Grup");
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        console.log(item["_id"]);
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: i,
          behaviourType: 'XP',
          'XP': p,
          'HP': 0,
          Coins: 0,
          Energy:0,
          evaluation: Session.get('evaluation'),
          comment: $("#commentXPGroup").val(),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentXP', item["_id"], p);

      });
    });
    if ( Session.get('addedXP') != 0) {
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: 'teacherXP',
          behaviourType: 'teacherXP',
          'XP': Session.get('addedXP'),
          'HP': 0,
          Coins: 0,
          Energy:0,
          evaluation: Session.get('evaluation'),
          comment: Session.get('addedXP') + " XP by teacher (" + $("#commentXPGroup").val() + ")",
          createdOn: new Date()
        };
        // Meteor.call('historyInsert', historyItem);
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentXP', item["_id"], Session.get('addedXP'));
      });
    }
    Modal.hide('allXPModal');
  },
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
    xp=parseInt($(event.currentTarget).find(".badge").text());
    win=$("#WinOrLoseXP").is(":checked");
    if ($(event.currentTarget).hasClass("activeTask")) {
      if (win) {
        Session.set('addedXP', Session.get('addedXP') + xp);
      } else {
        Session.set('addedXP', Session.get('addedXP') - xp);
      }
    } else {
      if (win) {
        Session.set('addedXP', Session.get('addedXP') - xp);
      } else {
        Session.set('addedXP', Session.get('addedXP') + xp);
      }
    }
  },
  'click #WinOrLoseXP': function(event) {
      Session.set('addedXP', -Session.get('addedXP'));
  }
});

Template.allHPModal.rendered = function() {
  Session.set('addedHP', 0);
}

Template.allHPModal.helpers({
  xps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: true });
  },
  hps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: false });
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  addedHP: function() {
    return Session.get('addedHP');
  }
});

Template.allHPModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('groupHPModal');
  },
  'click #hpModalSubmit': function(event) {
    event.preventDefault();
    $('#all_hp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      console.log("Grup");
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        console.log(item["_id"]);
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: i,
          behaviourType: 'HP',
          'XP': 0,
          'HP': -p,
          Coins: 0,
          Energy:0,
          evaluation: Session.get('evaluation'),
          comment: $("#commentHPGroup").val(),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentHP', item["_id"], p);
      });
    });
    if ( Session.get('addedHP') != 0) {
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: 'teacherHP',
          behaviourType: 'teacherHP',
          'XP': 0,
          'HP': Session.get('addedHP'),
          Coins: 0,
          Energy:0,
          evaluation: Session.get('evaluation'),
          comment: Session.get('addedHP') + " HP by teacher (" + $("#commentHPGroup").val() + ")",
          createdOn: new Date()
        };
        // Meteor.call('historyInsert', historyItem);
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentHP', item["_id"], -Session.get('addedHP'));
      });
    }
    Modal.hide('groupHPModal');
  },
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
    hp=parseInt($(event.currentTarget).find(".badge").text());
    win=$("#WinOrLoseHP").is(":checked");
    if ($(event.currentTarget).hasClass("activeTask")) {
      if (win) {
        Session.set('addedHP', Session.get('addedHP') + hp);
      } else {
        Session.set('addedHP', Session.get('addedHP') - hp);
      }
    } else {
      if (win) {
        Session.set('addedHP', Session.get('addedHP') - hp);
      } else {
        Session.set('addedHP', Session.get('addedHP') + hp);
      }
    }
  },
  'click #WinOrLoseHP': function(event) {
      Session.set('addedHP', -Session.get('addedHP'));
  }
});

Template.allBGModal.helpers({
  bgs: function() {
    return badges.find({ classId: Session.get('classId') }, { sort : { level : 1 } });
  },
  hps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: false });
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  badgeDisabled: function() {
      // l=100000;
      // students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
      //   if (s.level < l) {
      //     l=s.level;
      //   }
      // });
      // if ( l < this.level ) {
      //   return "disabled";
      // }
      n=0;
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
        n++;
        if ( n==1 || s.level < l ) { l=s.level; }
      });
      if (n==0) { l=0; }
      if ( l < this.level ) {
        return true;
      }
  }
});

Template.allBGModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('groupBGModal');
  },
  'click #bgModalSubmit': function(event) {
    event.preventDefault();
    $('#bg_modal_group').find(".list-group-item-danger").each( function() {
      badgeId=this.id;
      p=parseInt($(this).find(".badge").text());
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentBadge', item["_id"], badgeId);
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: badgeId,
          behaviourType: 'Badge',
          'XP': p,
          'HP': 0,
          Coins: 0,
          Energy:0,
          evaluation: Session.get('evaluation'),
          comment: 'Insignia ('+p+'XP)',
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentXP', item["_id"], p);
      });
    });
    Modal.hide('groupBGModal');
  },
});

/* allCardsModal */

// Template.allCardsModal.rendered = function() {
//   n=0;
//   students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
//     n++;
//     if ( n==1 || s.coins < c ) { c=s.coins; }
//   });
//   if (n==0) { c=0; }
//   Session.set('maxCoins', c);
//   Session.set('spentCoins', 0);
//   $(".allCardsModal").find(".itemEnabled").each( function() {
//     price=$(this).find(".badge").text();
//     if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
//       $(this).prop('disabled', true);
//     } else {
//       $(this).prop('disabled', false);
//     }
//   })
// }

Template.allCardsModal.helpers({
  cards: function() {
    return cards.find({ classId: Session.get('classId') }, { sort : { cardLevel : 1 } });
  },
  chromes: function() {
    return chromes.find({classId: Session.get('classId')}, { sort : { chromeLevel : 1 } });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  cardDisabled: function() {
    n=0;
    students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
      n++;
      if ( n==1 || s.level < l ) { l=s.level; }
    });
    if (n==0) { l=0; }
    if ( l < this.cardLevel ) {
      return true;
    }
  },
  chromeDisabled: function() {
      n=0;
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
        n++;
        if ( n==1 || s.level < l ) { l=s.level; }
      });
      if (n==0) { l=0; }
      if ( l < this.chromeLevel ) {
        return true;
      }
  },
  maxCoins: function() {
    return Session.get('maxCoins');
  },
  spentCoins: function() {
    return Session.get('spentCoins');
  }
});

Template.allCardsModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("list-group-item-danger");
    // coins=parseInt($(event.currentTarget).find(".price").text());
    // if ($(event.currentTarget).hasClass("list-group-item-danger")){
    //   Session.set('spentCoins', Session.get('spentCoins') + coins);
    // } else {
    //   Session.set('spentCoins', Session.get('spentCoins') - coins);
    // }
    // $(".allCardsModal").find(".itemEnabled").each( function() {
    //   price=$(this).find(".badge").text();
    //   if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
    //     $(this).prop('disabled', true);
    //   } else {
    //      $(this).prop('disabled', false);
    //   }
    // })
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('allCardsModal');
  },
  'click #cardModalSubmit': function(event) {
    event.preventDefault();
    // $('.all_cards_modal').find(".list-group-item-danger").each( function() {
    //   itemId=this.id;
    //   price=parseInt($(this).find(".badge").text());
    //   students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
    //     coins = students.findOne({_id: item["_id"]}).coins;
    //     if ( coins >= price ) {
    //       Meteor.call('buyingItem', item["_id"], itemId, price);
    //       coins-=price;
    //     } else {
    //       //alert(students.findOne({_id: item["_id"]}).studentName + " no tiene suficiente dinero");
    //       swal({
    //         title: students.findOne({_id: item["_id"]}).studentName + " " + TAPi18n.__('studentWithoutMoney'),
    //         text: TAPi18n.__('workHard'),
    //         icon: "warning",
    //       });
    //     }
    //   });
    // });
    $('.cardsModal').find(".list-group-item-danger").each( function() {
      cardId=this.id;
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentCard', item["_id"], cardId);
      });

    });
    // $('.chromesModal').find(".list-group-item").each( function() {
    //   chromeId=this.id;
    //   if ($(this).hasClass("list-group-item-danger")) {
    //     students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
    //       Meteor.call('studentChrome', item["_id"], chromeId);
    //     });
    //   }
    // });
    Modal.hide('all_cards_modal');
  },
});

/* allChromesModal */

Template.allChromesModal.rendered = function() {
  n=0;
  students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
    n++;
    if ( n==1 || s.coins < c ) { c=s.coins; }
  });
  if (n==0) { c=0; }
  Session.set('maxCoins', c);
  Session.set('spentCoins', 0);
  $(".allChromesModal").find(".itemEnabled").each( function() {
    price=$(this).find(".badge").text();
    if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
      $(this).prop('disabled', true);
    } else {
      $(this).prop('disabled', false);
    }
  })
}

Template.allChromesModal.helpers({
  cards: function() {
    return cards.find({ classId: Session.get('classId') }, { sort : { cardLevel : 1 } });
  },
  chromes: function() {
    return chromes.find({classId: Session.get('classId')}, { sort : { chromeLevel : 1 } });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  cardDisabled: function() {
    n=0;
    students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
      n++;
      if ( n==1 || s.level < l ) { l=s.level; }
    });
    if (n==0) { l=0; }
    if ( l < this.cardLevel ) {
      return true;
    }
  },
  chromeDisabled: function() {
      n=0;
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
        n++;
        if ( n==1 || s.level < l ) { l=s.level; }
      });
      if (n==0) { l=0; }
      if ( l < this.chromeLevel ) {
        return true;
      }
  },
  maxCoins: function() {
    return Session.get('maxCoins');
  },
  spentCoins: function() {
    return Session.get('spentCoins');
  }
});

Template.allChromesModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("list-group-item-danger");
    coins=parseInt($(event.currentTarget).find(".price").text());
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      Session.set('spentCoins', Session.get('spentCoins') + coins);
    } else {
      Session.set('spentCoins', Session.get('spentCoins') - coins);
    }
    $(".allChromesModal").find(".itemEnabled").each( function() {
      price=$(this).find(".badge").text();
      if ( price > Session.get('maxCoins') - Session.get('spentCoins') && ! $(this).hasClass("list-group-item-danger")) {
        $(this).prop('disabled', true);
      } else {
         $(this).prop('disabled', false);
      }
    })
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('allChromesModal');
  },
  'click #chromesModalSubmit': function(event) {
    event.preventDefault();
    // $('.all_chromes_modal').find(".list-group-item-danger").each( function() {
    //   itemId=this.id;
    //   price=parseInt($(this).find(".badge").text());
    //   students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
    //     coins = students.findOne({_id: item["_id"]}).coins;
    //     if ( coins >= price ) {
    //       Meteor.call('buyingItem', item["_id"], itemId, price);
    //       coins-=price;
    //     } else {
    //       //alert(students.findOne({_id: item["_id"]}).studentName + " no tiene suficiente dinero");
    //       swal({
    //         title: students.findOne({_id: item["_id"]}).studentName + " " + TAPi18n.__('studentWithoutMoney'),
    //         text: TAPi18n.__('workHard'),
    //         icon: "warning",
    //       });
    //     }
    //   });
    // });
    // $('.cardsModal').find(".list-group-item").each( function() {
    //   cardId=this.id;
    //   if ($(this).hasClass("list-group-item-danger")) {
    //     students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
    //       Meteor.call('studentCard', item["_id"], cardId);
    //     });
    //   }
    // });
    $('.chromesModal').find(".list-group-item-danger").each( function() {
      chromeId=this.id;
      price=parseInt($(this).find(".badge").text());
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentChrome', item["_id"], chromeId);
        Meteor.call('incCoins', item["_id"], -price);
      });
    });
    Modal.hide('all_chromes_modal');
  },
});

/* allCoinsModal */

Template.allCoinsModal.rendered = function() {
  Session.set('wonCoins', 0);
  Session.set('spentCoins', 0);
}

Template.allCoinsModal.helpers({
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
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
  }
});

Template.allCoinsModal.events({
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
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('allCoinsModal');
  },
  'click #AllWinOrLose': function(event) {

    win=$(event.target).is(":checked");

    if (win) {
      Session.set('wonCoins', Session.get('spentCoins'));
      Session.set('spentCoins',0);
    } else {
      Session.set('spentCoins', Session.get('wonCoins'));
      Session.set('wonCoins', 0);
    }
  },
  'click #allCoinsModalSubmit': function(event) {
    event.preventDefault();
    $('#all_coins_modal').find(".activeTask").each( function() {
      coins=parseInt($(this).find(".badge").text());
      win=$("#AllWinOrLose").is(":checked");
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        if (win) {
          Meteor.call('incCoins', item["_id"], coins);
        } else {
          Meteor.call('incCoins', item["_id"], -coins);
        }

      });
    });
    $('#all_coins_modal').find(".list-group-item-danger").each( function() {
      itemId=this.id;
      price=parseInt($(this).find(".badge").text());
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        coins = students.findOne({_id: item["_id"]}).coins;
        if ( coins >= price ) {
          Meteor.call('buyingItem', item["_id"], itemId, price);
          coins-=price;
        } else {
          swal({
            title: students.findOne({_id: item["_id"]}).studentName + " " + TAPi18n.__('studentWithoutMoney'),
            text: TAPi18n.__('workHard'),
            icon: "warning",
          });
        }
      });
    });
    Modal.hide('allCoinsModal');
  },
  'click .btn-info': function(event) {
    event.preventDefault();
    $(event.currentTarget).toggleClass("activeTask");
    coins=parseInt($(event.currentTarget).find(".badge").text());
    win=$("#AllWinOrLose").is(":checked");
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
  }
});

/* allStoreModal */

Template.allStoreModal.rendered = function() {
  n=0;
  students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
    n++;
    if ( n==1 || s.coins < c ) { c=s.coins; }
  });
  if (n==0) { c=0; }
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

Template.allStoreModal.helpers({
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  itemList: function() {
    return store.find({ classId: Session.get('classId') }, { sort : { itemLevel : 1 } });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  coins: function() {
    return students.findOne({_id: Session.get('studentId') }).coins;
  },
  maxCoins: function() {
    return Session.get('maxCoins');
  },
  spentCoins: function() {
    return Session.get('spentCoins');
  },
  itemLevelDisabled: function() {
      l=100000;
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] }).forEach(function (s){
        if (s.level < l) {
          l=s.level;
        }
      });
      if ( l < this.itemLevel ) {
        return true;
      // } else if ( Session.get('maxCoins') - Session.get('spentCoins') < this.price ) {
      //   return "disabled";
      }
  }
});

Template.allStoreModal.events({
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
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('allStoreModal');
  },
  'click #allStoreModalSubmit': function(event) {
    event.preventDefault();
    $('#all_store_modal').find(".activeTask").each( function() {
      coins=parseInt($(this).find(".badge").text());
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('incCoins', item["_id"], coins);
      });
    });
    $('#all_store_modal').find(".list-group-item-danger").each( function() {
      itemId=this.id;
      price=parseInt($(this).find(".badge").text());
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        coins = students.findOne({_id: item["_id"]}).coins;
        if ( coins >= price ) {
          Meteor.call('buyingItem', item["_id"], itemId, price);
          coins-=price;
        } else {
          swal({
            title: students.findOne({_id: item["_id"]}).studentName + " " + TAPi18n.__('studentWithoutMoney'),
            text: TAPi18n.__('workHard'),
            icon: "warning",
          });
        }
      });
    });
    Modal.hide('allStoreModal');
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
  }
});
