var sort = new ReactiveVar({});
sort.set({ createdOn: -1 });
Session.set('npage',0);

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
    sort.set({ createdOn: 1 });
  },
  'click #behaviour_th': function(event) {
    event.preventDefault();
    sort.set({ behavior: 1 });
  },
  'click .borrar': function(event) {
    event.preventDefault();
    if (this.behaviourType=="XP") {
      beh=behaviours.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentXP', this.student, -p);
    }
    if (this.behaviourType=="teacherXP") {
      Meteor.call('studentXP', this.student, -parseInt(this.XP));
    }
    if (this.behaviourType=="Task") {
      Meteor.call('chalDeleteXP', this.student, this.behavior);
      Meteor.call('studentXP', this.student, -parseInt(this.XP));
    }
    if (this.behaviourType=="HP") {
      beh=behaviours.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentHP',  this.student, -p);
    }
    if (this.behaviourType=="teacherHP") {
      Meteor.call('studentHP', this.student, parseInt(this.HP));
    }
    if (this.behaviourType=="Badge") {
      beh=badges.findOne({_id: this.behavior});
      p=beh.points;
      Meteor.call('studentXP',  this.student, -p);
      Meteor.call('studentBadgePull', this.student, this.behavior);
    }
    //alert(event.target.parentElement.parentElement.childElementCount);
    Meteor.call('behaviourLogDelete',this._id);
  },
  'click .nextpage': function(event) {
    event.preventDefault();
    Session.set('npage', Session.get('npage')+1);
    Meteor.subscribe('behavioursLog',"class",Session.get('classId'),Session.get('npage'));
  },
  'scroll #historytable': function(event) {
    event.preventDefault();
    mainContainer=event.target;
    if(mainContainer.scrollHeight - mainContainer.scrollTop <= mainContainer.clientHeight) {
      Session.set('npage', Session.get('npage')+1);
      Meteor.subscribe('behavioursLog',"class",Session.get('classId'),Session.get('npage'));
    }
  }
});
