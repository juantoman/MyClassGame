Template.missiongrid.helpers({
  challenge: function() {
    return challenges.find({classId: Session.get('classId')}, {sort: {order: 1}});
  },
  chalMissions: function(id) {
    return chalMissions.find({classId: Session.get('classId'), missionId: id}, {sort: {order: 1}});
  }
});