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
        evaluation: Session.get('evaluation'),
        comment: $("#commentXP").val(),
        createdOn: new Date()
      };
      Meteor.call('behaviourLogInsert', behaviour);
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    Modal.hide('xpModal');
  },
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  }
});
