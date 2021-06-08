Template.view.onRendered(function() {
  classId=location.pathname.substring(6);
  Session.set('classId',classId);
  if (classes.find({'_id':Session.get('classId')}).count()==0 || !classes.findOne({'_id':Session.get('classId')}).visibleClass  ) {
    if ( location.host == 'localhost:8000' ) {
      location.href = 'http://localhost:8000/';
    }
    if (location.origin == 'https://www.myclassgame.es') {
      location.href = 'https://www.myclassgame.es/';
    }
  }
  $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
  if ( classes.findOne({_id: Session.get("classId")}).backImg != "" ) {
    $("#mainTab").css('background-image','url("'+images.findOne({_id: classes.findOne({_id: Session.get("classId")}).backImg}).image_url+'")');
    $(".opacityDiv").addClass('opacityProfile');
   }
})
