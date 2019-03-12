Template.chat.onRendered(function() {
   $("#chatTeachers").scrollTo(0,500);
});
Template.chat.helpers({
  teacher: function() {
    if (Session.get('userType')=="teacher") {
     return true;
    } else {
     return false;
    };
  }
});