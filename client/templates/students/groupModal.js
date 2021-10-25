Template.groupModal.helpers({
  students: function() {
    return students.find( { $or: [ { groupId: Session.get('groupId') }, { $and: [ { groupId: 0 } , { classId: Session.get('classId')  } ] } ] } );
  },
  studentInGroup: function(studentId) {
    if ( Session.get('groupId') ==  students.findOne({_id: studentId}).groupId ) { return "list-group-item-danger"; }
  },
  groupName: function() {
    return groups.findOne( { _id: Session.get('groupId') }).groupName;
  },
  groupImg: function() {
    return groups.findOne( { _id: Session.get('groupId') }).groupImg;
  }
});

Template.groupModal.events({
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
        comment: $("#commentXPGroup").val(),
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
    gImage=$("#gImage").val();
    Meteor.call('groupModify', Session.get('groupId'), gName, gImage);
    Modal.hide('groupModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('groupModal');
  }
});

Template.groupXPModal.helpers({
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
  }
});

Template.groupXPModal.events({
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
    $('#xp_modal_group').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      console.log("Grup");
      students.find( { groupId: Session.get('groupId'), 'present': 1 } ).forEach(function (item){
        console.log(item["_id"]);
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: i,
          behaviourType: 'XP',
          evaluation: Session.get('evaluation'),
          comment: $("#commentXPGroup").val(),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentXP', item["_id"], p);
      });
    });
    Modal.hide('groupXPModal');
  },
});

Template.groupHPModal.helpers({
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
  }
});

Template.groupHPModal.events({
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
    $('#hp_modal_group').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      console.log("Grup");
      students.find( { groupId: Session.get('groupId'), 'present': 1 } ).forEach(function (item){
        console.log(item["_id"]);
        var behaviour = {
          classId: Session.get('classId'),
          student: item["_id"],
          behavior: i,
          behaviourType: 'HP',
          evaluation: Session.get('evaluation'),
          comment: $("#commentHPGroup").val(),
          createdOn: new Date()
        };
        Meteor.call('behaviourLogInsert', behaviour);
        Meteor.call('studentHP', item["_id"], p);
      });
    });
    Modal.hide('groupHPModal');
  },
});


Template.deleteGroup.events({
  'submit form': function(event) {
    event.preventDefault();
    students.find( { $and: [ { groupId: Session.get('groupId') } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
      studentId=item._id;
      Meteor.call('studentGroup', 0, studentId);
    });
    Meteor.call('groupDelete', Session.get('groupId'));
    Modal.hide('deleteGroup');
    Session.set('groupSelected', false);
  }
});
