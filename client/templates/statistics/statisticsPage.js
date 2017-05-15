Template.statisticsPage.helpers({
  statistics: function() {
    return behavioursLog.find({classId: Session.get('classId')});
  },
  student: function(){
    return students.findOne({_id: this.student});
  },
  behaviour: function(){
    return behaviours.findOne({_id: this.behavior});
  },
  createdOnFormatted: function (date) {
    return moment(date).format('LLLL');
  }
});

Template.statisticsPage.events({
  'click #student_th': function(event) {
    event.preventDefault();
    console.log("th");
  }
});

