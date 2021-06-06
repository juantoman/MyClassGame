Template.view.onRendered(function() {
  classId=location.pathname.substring(6);
  Session.set('classId',classId);
})
