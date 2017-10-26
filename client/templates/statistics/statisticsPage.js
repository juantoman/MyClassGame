var sort = new ReactiveVar({});

Template.statisticsPage.helpers({
  statistics: function() {
    return behavioursLog.find({classId: Session.get('classId')},{sort: sort.get()});
    //return behavioursLog.find({classId: Session.get('classId')},{sort: {student: -1}});
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
    sort.set({ student: 1 });
  },
  'click #date_th': function(event) {
    event.preventDefault();
    sort.set({ createdOn: 1 });
  },
  'click #behaviour_th': function(event) {
    event.preventDefault();
    sort.set({ behavior: 1 });
  }
});

