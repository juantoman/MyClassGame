Template.studentsMainPage.rendered = function() {
  Session.set('evaluation',classes.findOne({_id:Session.get('classId')}).evaluation);
  $('#evaluacion').val(Session.get('evaluation'));
}
Template.studentsMainPage.helpers({
  className: function() {
    return Session.get('className');
  },
  btnSelected: function(option) {
    if ( option == "students" && Session.get('sogBtn') == "students" ) {return "btn-warning"; }
    if ( option == "groups" && Session.get('sogBtn') == "groups" ) {return "btn-warning"; }
  },
  studentsSelected: function() {
    if ( Session.get('sogBtn') == "students" ) {
      return true;
    } else {
      return false;
    }
  },
  golSelected: function(option) {
    if ( option == "grid" && Session.get('golBtn') == "grid" ) {return "btn-warning"; }
    if ( option == "list" && Session.get('golBtn') == "list" ) {return "btn-warning"; }
  },
  gridSelected: function() {
    if ( Session.get('golBtn') == "grid" ) {
      return true;
    } else {
      return false;
    }
  },
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  },
  idClass: function() {
    return Session.get('classId');
  },
  selected: function() {
    return Session.get('studentSelected');
  }
});

Template.studentsMainPage.events({
  'click .btn-sog': function(event) {
    event.preventDefault();
    Session.setPersistent('sogBtn', event.target.id);
  },
  'click .btn-gol': function(event) {
    event.preventDefault();
    Session.setPersistent('golBtn', event.target.id);
  },
  'click .btn-all': function(event) {
    event.preventDefault();
    if (Session.get('allBtn')=="All") {
      Session.set('allBtn', 'None');
      $('#all').removeClass('btn-warning');
      students.find( { $and: [ { selected: 1 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
      });
    } else {
      Session.set('allBtn', 'All');
      $('#all').addClass('btn-warning');
      students.find( { $and: [ { selected: 0 } , { classId: Session.get('classId')  } ] } ).forEach(function (item){
        Meteor.call('studentSelection', item["_id"]);
      });
    };
  },
  'click .btn-xp': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allXPModal');
    }
  },
  'click .btn-hp': function(event) {
    event.preventDefault();
    if ( Session.get('userType')=="teacher") {
      Modal.show('allHPModal');
    }
  },
  'change #className': function(event) {
    event.preventDefault();
    Meteor.call('classUpdate',Session.get('classId'), event.currentTarget.value);
  },
  'change select': function(event) {
    event.preventDefault();
    Session.setPersistent('evaluation', $(event.target).val());
    Meteor.call('changeEvaluation', Session.get('classId'),$(event.target).val());
  }
});