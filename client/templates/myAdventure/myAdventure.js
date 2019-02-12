Template.myAdventure.onRendered(function() {
  $('#sn').html(classes.findOne({ _id: Session.get('classId') } ).adventureDesc);
});
Template.myAdventure.helpers({
  class: function() {
    return classes.findOne({ _id: Session.get('classId') } );
  },
  studentName: function() {
    return students.findOne({_id: Session.get('currentStudent')}).studentName;
  },
  mission: function() {
    t=students.findOne({_id: Session.get('currentStudent')}).activeTask;
    m=chalMissions.findOne({_id: t}).missionId;
    return challenges.findOne({_id: m});
  },
  task: function() {
    t=students.findOne({_id: Session.get('currentStudent')}).activeTask;
    return chalMissions.findOne({_id: t});
  }
});

Template.myAdventure.events({
  'click #student_th': function(event) {
    event.preventDefault();
    sort.set({ student: 1 });
  }
});

