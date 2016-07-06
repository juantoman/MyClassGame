Template.badgeModal.helpers({
  badgesList: function() {
    return badges.find({ classId: Session.get('classId') });
  }
});

Template.badgeModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click #badgeModalSubmit': function(event) {
    event.preventDefault();
    $('.modal').find(".list-group-item-danger").each( function() {
      badgeId=this.id;
      Meteor.call('studentBadge', Session.get('studentId'), badgeId);
    });
    Modal.hide('badgeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('badgeModal');
  }
});
