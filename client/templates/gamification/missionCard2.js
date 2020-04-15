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
  }
})
