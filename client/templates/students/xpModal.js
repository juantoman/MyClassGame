Template.xpModal.rendered = function() {
  Session.set('addedXP', 0);
}

Template.xpModal.helpers({
  xps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: true },{sort:{'behaviourDescription':1}});
  },
  hps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: false },{sort:{'behaviourDescription':1}});
  },
  students: function() {
    return students.find({classId: Session.get('classId')}, { $or: [ { groupId: 0 }, { groupId: Session.get('groupId') } ] });
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  },
  studentXP: function() {
    return students.findOne({_id: Session.get('studentId') }).XP;
  },
  addedXP: function() {
    return Session.get('addedXP');
  }
});

Template.xpModal.events({
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
        'XP': p,
        'HP': 0,
        Coins: 0,
        Energy:0,
        evaluation: Session.get('evaluation'),
        comment: $("#commentXP").val(),
        createdOn: new Date()
      };
      // var historyItem = {
      //   classId: Session.get('classId'),
      //   student: Session.get('studentId'),
      //   logType: 'behaviourXP',
      //   elementId: i,
      //   'XP': p,
      //   'HP': 0,
      //   Coins: 0,
      //   Energy:0,
      //   evaluation: Session.get('evaluation'),
      //   comment: $("#commentXP").val(),
      //   createdOn: new Date()
      // };
      Meteor.call('behaviourLogInsert', behaviour);
      // Meteor.call('historyInsert', historyItem);
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    if ( Session.get('addedXP') != 0) {
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: 'teacherXP',
        behaviourType: 'teacherXP',
        'XP': Session.get('addedXP'),
        'HP': 0,
        Coins: 0,
        Energy:0,
        evaluation: Session.get('evaluation'),
        comment: Session.get('addedXP') + " XP by teacher (" + $("#commentXP").val() + ")",
        createdOn: new Date()
      };
      // Meteor.call('historyInsert', historyItem);
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentXP', Session.get('studentId'), Session.get('addedXP'));
    }
    var audio = new Audio('/sound/level-up-retro-video-game-soundroll.mp3');
    audio.play();
    Modal.hide('xpModal');
  },
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
