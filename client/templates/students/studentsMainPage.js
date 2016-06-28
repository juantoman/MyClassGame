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
  }
});

Template.studentsMainPage.events({
  'click .btn-sog': function(event) {
    event.preventDefault();
    Session.setPersistent('sogBtn', event.target.id);
  }
});