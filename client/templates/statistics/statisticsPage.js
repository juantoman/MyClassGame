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
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});

Template.statisticsPage.events({
  'click #student_th': function(event) {
    event.preventDefault();
    sort.set({ student: 1 });
  },
  'click #date_th': function(event) {
    event.preventDefault();
    sort.set({ createdOn: -1 });
  },
  'click #behaviour_th': function(event) {
    event.preventDefault();
    sort.set({ behavior: 1 });
  },
  'click .borrar': function(event) {
    event.preventDefault();
    log=behavioursLog.findOne({_id: event.target.name});
    student=log.student;
    bType=log.behaviourType;
    bId=log.behavior;
    beh=behaviours.findOne({_id: log.behavior});
    p=beh.points;
    if (log.behaviourType=="XP") {
      Meteor.call('studentXP', student, -p);
    }
    if (log.behaviourType=="HP") {
      Meteor.call('studentHP', student, -p);
    }
    //alert(event.target.parentElement.parentElement.childElementCount);
    Meteor.call('behaviourLogDelete',event.target.name);
  }
});

