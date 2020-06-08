Template.badgeModal.helpers({
  badgesList: function() {
    return badges.find({ classId: Session.get('classId') });
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
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
    $('.badgeModal').find(".list-group-item-danger").each( function() {
      badgeId=this.id;
      Meteor.call('studentBadge', Session.get('studentId'), badgeId);
      p=parseInt($(this).find(".badge").text());
      Meteor.call('studentXP', Session.get('studentId'), p);
    });
    Modal.hide('badgeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('badgeModal');
  }
});
