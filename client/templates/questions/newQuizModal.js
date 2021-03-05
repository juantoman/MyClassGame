Template.newQuizModal.helpers({

});

Template.newQuizModal.events({
  'submit form.newQuizForm': function(event) {
    // event.preventDefault();
    // id=Session.get("chalId");
    // n=chalMissions.find({missionId: id}).count()+1;
    // var xp=$(event.target).find('[name=chalMissionXP]').val();
    // if ( xp == "" || isNaN(parseInt(xp)) ) {
    //   xp=parseInt(0);
    // } else {
    //   xp=parseInt(xp);
    // }
    // var chal = {
    //   classId: Session.get('classId'),
    //   missionId: id,
    //   order: n,
    //   chalMissionDesc: $(event.target).find('[name=chalMissionDesc]').val(),
    //   chalMissionXP: xp,
    //   descTask:$(event.target).find('[name=descTask]').val(),
    //   visible: $(event.target).find('[name=taskVisible]').is(":checked"),
    //   r1: $(event.target).find('[name=r1]').val(),
    //   r2: $(event.target).find('[name=r2]').val(),
    //   r3: $(event.target).find('[name=r3]').val(),
    //   r4: $(event.target).find('[name=r4]').val(),
    //   r5: $(event.target).find('[name=r5]').val(),
    //   r6: $(event.target).find('[name=r6]').val(),
    //   createdOn: new Date()
    // };
    // Meteor.call('chalMissionInsert', chal);
    // Modal.hide("taskModal");

    event.preventDefault();
    n=quizzes.find({classId: Session.get("classId")}).count()+1;
    var quiz = {
      userId: Meteor.userId(),
      classId: Session.get('classId'),
      quizName: $(event.target).find('[name=quizName]').val(),
      quizDesc: $(event.target).find('[name=quizDesc]').val(),
      order: n,
      visible: false,
      createdOn: new Date()
    }
    Meteor.call('quizInsert',quiz);
    Modal.hide("newQuizModal");
  },
  'click .btn-default': function(event) {
    event.preventDefault();
    Modal.hide('newQuizModal');
  }
});
