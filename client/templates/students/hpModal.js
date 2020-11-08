Template.hpModal.rendered = function() {
  Session.set('addedHP', 0);
}

Template.hpModal.helpers({
  xps: function() {
    return behaviours.find({classId: Session.get('classId'), positive: true });
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
  studentHP: function() {
    return students.findOne({_id: Session.get('studentId') }).HP;
  },
  addedHP: function() {
    return Session.get('addedHP');
  }
});

Template.hpModal.events({
  'click #hpModalSubmit': function(event) {
    event.preventDefault();
    hp = students.findOne({_id:  Session.get('studentId')}).HP;
    var wc = 0;
    $('#hp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      wc=wc+p;
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        behaviourType: 'HP',
        'XP': 0,
        'HP': -p,
        Coins: 0,
        Energy:0,
        comment: $("#commentHP").val(),
        evaluation: Session.get('evaluation'),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentHP', Session.get('studentId'), p);
    });
    if ( Session.get('addedHP') != 0) {
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: 'teacherHP',
        behaviourType: 'teacherHP',
        'XP': 0,
        'HP': Session.get('addedHP'),
        Coins: 0,
        Energy:0,
        evaluation: Session.get('evaluation'),
        comment: Session.get('addedHP') + " HP by teacher (" + $("#commentHP").val() + ")",
        createdOn: new Date()
      };
      // Meteor.call('historyInsert', historyItem);
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentHP', Session.get('studentId'), -Session.get('addedHP'));
    }
    wc=wc-Session.get('addedHP');
    Modal.hide('hpModal');
    if (hp <= wc) {
     Modal.show('conviction');
    }
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
