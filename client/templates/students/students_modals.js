Template.studentsModals.helpers({
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
  student: function() {
    return students.findOne({ _id: Session.get('studentId') } );
  }
});

Template.studentsModals.events({
  'submit form#add_student_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    var iniHP = parseInt(classes.findOne({_id: Session.get('classId')}).iniHP);
    var nombres =  $(event.target).find('[name=students-names]').val().split(",");
    nombres.forEach(function (studentName) {
      if(studentName!=""){
        var student = {
          classId: Session.get('classId'),
          studentName: studentName,
          alias: studentName,
          groupId: 0,
          XP: 0,
          HP: iniHP,
          level: 0,
          coins: 0,
          rs: 0,
          os: 0,
          ys: 0,
          ws: 0,
          bs: 0,
          gs: 0,
          badges: [],
          items: [],
          cards: [],
          powers: [],
          collection: [],
          selected: 0,
          conected: 0,
          createdOn: new Date()
        };
        Meteor.call('studentInsert', student);
      }
    });
    var emails =  $(event.target).find('[name=students-emails]').val().split(",");
    emails.forEach(function (studentEmail) {
      if(studentEmail!=""){
        studentName=studentEmail.split("@")[0];
        var student = {
          classId: Session.get('classId'),
          studentName: studentName,
          alias: studentName,
          email: studentEmail,
          groupId: 0,
          XP: 0,
          HP: iniHP,
          level: 0,
          coins: 0,
          rs: 0,
          os: 0,
          ys: 0,
          ws: 0,
          bs: 0,
          gs: 0,
          badges: [],
          items: [],
          cards: [],
          powers: [],
          collection: [],
          selected: 0,
          conected: 0,
          createdOn: new Date()
        };
        Meteor.call('studentInsert', student);
      }
    });
    $('#add_student_modal').modal('hide');
  },
  'submit form#mod_student_form': function(event) {
    event.preventDefault();
    var user = Meteor.user();
    studentId=Session.get('studentId');
    studentName=$(event.target).find('[name=sName]').val();
    level=$(event.target).find('[name=sLevel]').val();
    alias=$(event.target).find('[name=sAlias]').val();
    avatar=$(event.target).find('[name=sAvatar]').val();
    email=$(event.target).find('[name=sEmail]').val();
    Meteor.call('studentModify',studentId,studentName,level,alias,avatar,email);
    $('#mod_student_modal').modal('hide');
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
    alert("Hola");
    $('#hp_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      p=parseInt($(this).find(".badge").text());
      var user = Meteor.user();
      var behaviour = {
        classId: Session.get('classId'),
        student: Session.get('studentId'),
        behavior: i,
        behaviourType: 'HP',
        comment: $("#commentHP").val(),
        evaluation: Session.get('evaluation'),
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
        comment: $("#commentXP").val(),
        evaluation: Session.get('evaluation'),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    $('#xp_modal').modal('hide');
  },
  'click #groupModalSubmit': function(event) {
    event.preventDefault();
    $('#group_modal').find(".list-group-item-danger").each( function() {
      i=this.id;
      Meteor.call('studentGroup', Session.get('groupId'), i);
    });
    $('#group_modal').modal('hide');
  }
});
