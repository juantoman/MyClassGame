Template.badgeModal.helpers({
  badgesList: function() {
    return badges.find({ classId: Session.get('classId') } , { sort : { level : 1 } } );
  },
  srcImage: function(imgId) {
    cloudinary_url=images.findOne({_id: imgId }).image_url;
    cloudinary_url=cloudinary_url.replace('/upload/','/upload/q_auto,w_auto,h_150,f_auto,dpr_auto/');
    return cloudinary_url;
  },
  badgeDisabled: function() {
    // s=students.findOne({_id: Session.get('studentId')});
    // xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    // if (xpChecked) {
    //   levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
    //   l=parseInt(s.XP/levelXP);
    // } else {
    //   l=parseInt(s.level);
    // }
    // if ( l < this.level ) {
    //   return "disabled";
    // }
    if ( students.findOne( { _id : Session.get("studentId") } ).level < this.level ) {
      return true;
    }
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
    //xpChecked=classes.findOne({_id: Session.get('classId')}).xpChangeLevel;
    $('.badgeModal').find(".list-group-item-danger").each( function() {
      // l=0;
      // if (xpChecked) {
      //   levelXP=classes.findOne({_id: Session.get('classId')}).levelXP;
      //   XP=students.findOne({_id: Session.get('studentId')}).XP;
      //   l=parseInt(XP/levelXP);
      // } else {
      //   l=parseInt(students.findOne({_id: Session.get('studentId')}).level);
      // }
      // if (parseInt(this.getAttribute("data-level")) > l ) {
      //   swal({
      //     title: "Nivel del usuario inferior al de la insignia",
      //     type: 'warning'
      //   })
      // } else {
        badgeId=this.id;
        Meteor.call('studentBadge', Session.get('studentId'), badgeId);
        p=parseInt($(this).find(".badge").text());
        Meteor.call('studentXP', Session.get('studentId'), p);
      //}
    });
    Modal.hide('badgeModal');
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('badgeModal');
  }
});
