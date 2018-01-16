Template.studentsMainPage.rendered = function() {
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
    } else {
     Session.set('allBtn', 'All');
     $('#all').addClass('btn-warning');
    };
  },
  'change #className': function(event) {
    event.preventDefault();
    Meteor.call('classUpdate',Session.get('classId'), event.currentTarget.value);
  },
  'change select': function(event) {
    event.preventDefault();
    Session.setPersistent('evaluation', $(event.target).val());
  },
});