Template.missionCard2Template.onRendered(function() {
  $('.missionWrapper').addClass('loaded');
});

Template.missionCard2Template.events({
  'click .undoBtn': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    event.stopPropagation();
  },
  'click .more-info': function(event) {
    event.preventDefault();
    $('.missionCard2').removeClass('flip');
    $(event.currentTarget).closest('.missionCard2').toggleClass('flip');
    $('.arrow').remove();
  },
  'click .missionDeleteBtn': function(event) {
    event.preventDefault();
    Session.set('missionId',this._id)
    Modal.show('deleteMission');
  },
  'submit form.missionForm': function(event) {
    event.preventDefault();
    //alert($(event.target).find('[name=MoC]').val())
    //alert($(event.target).find('[id=notebookCheck]').prop('checked'));
    //n=challenges.find({classId: Session.get('classId')}).count()+1;
    var chal = {
      chalName: $(event.target).find('[name=chalName]').val(),
      chalDesc: $(event.target).find('[name=chalDesc]').val(),
    };
    Meteor.call('chalUpdate', this._id, chal);
  }
})
