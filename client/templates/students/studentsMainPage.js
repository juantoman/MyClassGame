Template.studentsMainPage.helpers({
  className: function() {
    return Session.get('className');
  },
  btnSelected: function(option) {
    if ( option == "students" && Session.get('sogBtn') == "students" ) {return "btn-primary"; }
    if ( option == "groups" && Session.get('sogBtn') == "groups" ) {return "btn-primary"; }
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
  }
});