Template.storeModal.helpers({
  itemList: function() {
    return store.find({ classId: Session.get('classId') });
  }
});

Template.storeModal.events({
  'click .list-group-item': function(event) {
    event.preventDefault();
    if ($(event.currentTarget).hasClass("list-group-item-danger")){
      $(event.currentTarget).removeClass("list-group-item-danger");
    } else {
      $(event.currentTarget).addClass("list-group-item-danger");
    }
  },
  'click #storeModalSubmit': function(event) {
    event.preventDefault();
    $('.storeModal').find(".list-group-item-danger").each( function() {
      badgeId=this.id;
      Meteor.call('studentBadge', Session.get('studentId'), badgeId);
      p=parseInt($(this).find(".badge").text());
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    Modal.hide('storeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('storeModal');
  }
});
